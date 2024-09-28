const CodeSormapplicant = require('../models/codestormapplicant.model')
const {checkName,checkEmail,checkPhone, checkPSwebsites, checkNationalId} = require('../Helpers/Validators')
const path = require("path");
const fs = require("fs");
const { Parser } = require("json2csv");
const Themes = require('../models/theme2.model')
const PDFlib = require('pdf-lib')
const fontkit = require('fontkit');
const qr = require("qrcode");



exports.sendcodestormuser = async (req, res) => {
    try{
    let rec = req.body
    if(checkName(rec.payload['name'])){
        res.status(422).json([{
            message: 'Enter a valid name!'
        }])
        return;
    }

    if(checkNationalId(rec.payload['id'])){
        res.status(422).json([{
            message: 'Enter a valid national id!'
        }])
        return;
    }


    if(checkEmail(rec.payload['email'])){
        res.status(422).json([{
            message: 'Enter a valid email!'
        }])

        return;
    }

    if(checkPhone(rec.payload['phone'])){
        res.status(422).json([{
            message: 'Enter a valid phone!'
        }])     
        return;
    }

    if(checkPSwebsites(rec.payload['favHandler'])){
        res.status(422).json([{
            message: 'Enter a valid website!'
        }])
        return;
    }


    const applicant = new CodeSormapplicant({
        ...rec.payload
    })
    await applicant.save();
    res.status(201).json([{
        message: 'Registered successfully!'
    }]);  
    }catch(err){
        // console.log(err);

        if (err.code === 11000) {
            
            if(err.keyValue['id'])
                return  res.status(422).json([{message: 'Id already exist!' }]);
            else if(err.keyValue['email'])
                return  res.status(422).json([{message: 'Email already exist!' }]);
            else if(err.keyValue['phone'])
                return  res.status(422).json([{message: 'Phone already exist!' }]);
          }


        res.status(422).json([{
            message: 'Something went wrong!'
        }])
    }

}


exports.VerifyCodeStorm = async (req, res) => {
    if(!req.body.payload){
        res.status(422).json([{
        message: 'Enter a valid id!'
        }])
        return;
    }


    const results = await CodeSormapplicant.find({id:req.body.payload});
    if(results.length ==0){
        res.status(422).json([{
        message: 'This ticket is not verified!'
        }])
        return;
    }
    res.status(200).json([{
        message: `${results[0]['name']}`
    }]);
}



exports.exportCodeStorm = async (req, res) => {
    const fields = [
        "createdAt",
        "name",
        "email",
        "favHandler",
        "handler",
        "phone",
        "id",
        "university",
        "college"
    ];
    const opts = { fields };
    const results = await CodeSormapplicant.find({});
    const dateTime = new Date().getTime();
    const filePath = path.join(
        __dirname,
        "..",
        "..",
        "public",
        "exports",
        "CodeStorm-" + dateTime + ".csv"
    );

    const parser = new Parser(opts);
    const csv = parser.parse(results);
    //
    fs.writeFile(filePath, csv, function (err) {
        if (err) {
        return res.json(err).status(500);
        } else {
        setTimeout(function () {
            fs.unlinkSync(filePath); // delete this file after 30 seconds
        }, 30000);
        //  return res.download("../public/exports/csv-" + dateTime + ".csv");
        return res.download(filePath);
        }
    });
}

  
exports.exportCodeStormTicket = async (req, res) => {
    console.log(req.body)
    const results = await CodeSormapplicant.find({id:req.body.payload});
    if(results.length ==0){
        res.status(422).json([{
        message: 'Enter a valid id!'
        }])
        return;
    }

        //*********ThemeData*********/
        const theme = "CodeStormTicket";
        const ThemeData = await Themes.find({theme:theme});
        const Xend = parseInt(ThemeData[0]['Xend']);
        const Xstart = parseInt(ThemeData[0]['Xstart']);
        const Y = parseInt(ThemeData[0]['Y']);
        const ColorR = parseInt(ThemeData[0]['ColorR']);
        const ColorG = parseInt(ThemeData[0]['ColorG']);
        const ColorB = parseInt(ThemeData[0]['ColorB']);
        const DateX = parseInt(ThemeData[0]['DateX']);
        const DateY = parseInt(ThemeData[0]['DateY']);
        const DateR = parseInt(ThemeData[0]['DateR']);
        const DateG = parseInt(ThemeData[0]['DateG']);
        const DateB = parseInt(ThemeData[0]['DateB']);
        const DateSize = parseInt(ThemeData[0]['DateSize']);
        const UseDate = ThemeData[0]['UseDate'];
        const ThemeFont = ThemeData[0]['Font'];
        //***************************/

        const PDFpath = path.join(
            __dirname,
            "..",
            "..",
            "static",
            "CertificateThemes",
            theme+".pdf"
        );
        const FontPath = path.join(
            __dirname,
            "..",
            "..",
            "static",
            "Fonts",
            ThemeFont+".ttf"
        );

        const exBytes = fs.readFileSync(PDFpath, null).buffer;
        const exFont = fs.readFileSync(FontPath,null).buffer;
        const pdfDoc = await PDFlib.PDFDocument.load(exBytes)
        
        pdfDoc.registerFontkit(fontkit);
        const Font = await pdfDoc.embedFont(exFont);
    
        const pages = pdfDoc.getPages();
        const firstP = pages[0];
        const TicketHolder = results[0]['name'];
    
        //Calculate Font Size and center the text
        const FontSize = getFontSizeForWidth(TicketHolder, Xend-Xstart,Font);
        const width = Font.widthOfTextAtSize(TicketHolder, FontSize);;
        const StartLocation = ((Xend+Xstart) - width)/2;
    
         firstP.drawText(TicketHolder,{
            x:StartLocation,
            y:Y,
            size:FontSize,
            font:Font,
            color: PDFlib.rgb(ColorR, ColorG, ColorB)
        })

        const qrCodeText = `https://ieee.aswu.edu.eg/CodeStorm/verify/?id=${req.body.payload}`; // Replace with your QR code content
        const qrCodeImage = await generateQRCode(qrCodeText);

        const qrCodeImageXObject = await pdfDoc.embedPng(qrCodeImage);
        const qrCodeImageDims = qrCodeImageXObject.scale(0.5); // Scale the image size

        firstP.drawImage(qrCodeImageXObject, {
            x: 385,
            y: 10,
            width: qrCodeImageDims.width,
            height: qrCodeImageDims.height,
          });

        const uri = await pdfDoc.saveAsBase64(); 
        res.status(200).json([{
            TicketID: results[0]['TicketID'],
            PDF: uri
            }])


}


function getFontSizeForWidth(string, maxWidth,font) {
    // Set the minimum and maximum font sizes to consider
    let minFontSize = 1;
    let maxFontSize = 45;
    let fontSize;
  
    //binary search
    while (minFontSize !== maxFontSize) {
      fontSize = Math.floor((minFontSize + maxFontSize) / 2);
  
      // To avoid some infinite loop cases
      if (maxFontSize - minFontSize <= 1) {
        break;
      }
  
      // Get the width of the string with the current font size
      const width = font.widthOfTextAtSize(string, fontSize);

      if (width > maxWidth) {
        maxFontSize = fontSize;
      } else {

        minFontSize = fontSize;
      }
    }
  
    return fontSize;
  }

async function generateQRCode(text) {
    try {
      const qrCode = await qr.toBuffer(text, {
        errorCorrectionLevel: "H", // High error correction level
        type: "image/png", // PNG format
        rendererOpts: {
          quality: 1, // Image quality (1 = highest)
        },
      });
      return qrCode;
    } catch (error) {
      console.error("Error generating QR code:", error);
      throw error;
    }
  }
