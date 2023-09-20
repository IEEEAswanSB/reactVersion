const Beincamp = require('../models/beincamp.model')
const Themes = require('../models/theme.model')
const path = require("path");
const PDFlib = require('pdf-lib')
const fontkit = require('fontkit');
const sharp = require('sharp');
const fs = require("fs");
const imageValidation = require('image-validation').default
const { Parser } = require("json2csv");


exports.beincampRegister = async (req, res) => {
    try {
//-------------------Validations At the Server-------------------
        const NameRegex = /^[a-zA-Z\u0600-\u06FF ]{2,30}$/;
        if(!NameRegex.test(req.body.payload['name'])){
            res.status(422).json([{
                field: 'name',
                type: 'ValidationError',
                message: 'This is not a name!'
            }])
            return;
        }

       const EmailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(!EmailRegex.test(req.body.payload['email'])){
            res.status(422).json([{
                field: 'email',
                type: 'ValidationError',
                message: 'This is not an email!'
            }])
            return;
        }
        
        const PhoneRegex = /^(010|011|012|015)[0-9]{8}$/;
        if(!PhoneRegex.test(req.body.payload['phone'])){
            res.status(422).json([{
                field: 'phone',
                type: 'ValidationError',
                message: 'This is not a phone number!'
            }])
            return;
        }
        const IdRegex = /^[0-9]{14}$/;
        if(!IdRegex.test(req.body.payload['id'])){
            res.status(422).json([{
                field: 'id',
                type: 'ValidationError',
                message: 'This is not an id!'
            }])
            return;
        }

        const ImgValidation = await  imageValidation(req.body.payload['PaymentImg'],{ throw: false })
        if(!ImgValidation){
            res.status(422).json([{
            field: 'PaymentImg',
            type: 'ValidationError',
            message: 'This is not an image!'
        }])
        return;
        }
//!!!-------------------Validations-------------------!!!//
        
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let randomString='';
    for(let i=0;i<8;i++){
        randomString += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    const imgName =  randomString.substring(0,4) + req.body.payload['id']+ randomString.substring(4,8) + ".webp";
    const Data = {...req.body.payload}
    Data['PaymentImg'] = imgName;

    const beincamp = new Beincamp({ 
        ...Data
    })
    await beincamp.save()

    const imgpath = path.join(
        __dirname,
        "..",
        "..",
        "static",
        "BeinCampData",
        imgName
    );

    const OrginalImg64Data = req.body.payload['PaymentImg'].replace(/^data:image\/(png|jpeg|jpg);base64,/, "");
    const imageBuffer = Buffer.from(OrginalImg64Data, 'base64');

    const convertedImage = await sharp(imageBuffer).toFormat('webp').toBuffer();
    let ConvertedImg64Data = convertedImage.toString('base64');

    fs.writeFile(imgpath, ConvertedImg64Data, 'base64', function(err) {
        console.log(err);
      });

    res.status(201).json({ beincamp });   
    } catch(error) {
        console.log({ error })
        const { errors:errs } = error
        if (errs && errs.length) {
            const errors = []
            Object.keys(errs).forEach((key) => {
                errors.push({
                    field: key,
                    type: errs[key].name,
                    message: errs[key].message
                })
            })
            res.status(422).json(error)
        } else {
            res.status(422).json([{
                field: 'id',
                type: 'ValidationError',
                message: 'This id is already registered!'
            }])
        }
    }


}
//------------------------------------------------


exports.exportBeinTicket = async (req, res) => {
    const results = await Beincamp.find({id:req.body.payload.id});
    if(results.length ==0){
        res.status(422).json([{
        message: 'Enter a valid id!'
        }])
        return;
    }

    if(results[0]['validated'] == false){
        res.status(422).json([{
        message: 'Your ticket is not validated!'
        }])
    return;
    }

        //*********ThemeData*********/
        const theme = "BeinCampTicket05";
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
        const TicketHolder = results[0]['certificateName'];
    
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

        // Ticket ID

        // firstP.drawText(results[0]['TicketID'],{
        //     x:0,
        //     y:0,
        //     size:FontSize,
        //     font:Font,
        //     color: PDFlib.rgb(ColorR, ColorG, ColorB)
        // })
    
        if(UseDate ==1){
            firstP.drawText(results[0]['TicketID'],{
                x:DateX,
                y:DateY,
                size:DateSize,
                font:Font,
                color: PDFlib.rgb(DateR, DateG, DateB)
            })
        }
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


//------------------------------------------------
exports.exportBeincamp = async (req, res) => {
    const fields = [
        "createdAt",
        "name",
        "email",
        "phone",
        "birth",
        "id",
        "university",
        "otherUniversity",
        "faculty",
        "otherFaculties",
        "year",
        "department",
        "track",
        "certificateName",
        "validated",
        "PaymentImg",
        "TicketID",
    ];
    const opts = { fields };
    const results = await Beincamp.find({});
    const dateTime = new Date().getTime();
    const filePath = path.join(
        __dirname,
        "..",
        "..",
        "public",
        "exports",
        "BeinCamp-" + dateTime + ".csv"
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