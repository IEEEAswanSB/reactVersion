const Certificate = require('../models/certificate.model')
const PassCodes = require('../models/passcodes.model')
const Themes = require('../models/theme.model')
const fs = require("fs");
const stream = require("stream")
const { parse } = require("csv-parse");
const PDFlib = require('pdf-lib')
const path = require("path");
const fontkit = require('fontkit');

exports.validateCertificate = async (req, res) => {
    const results = await Certificate.find({id:req.body.payload.id});
    res.status(201).json([{ 
        found: results.length===0 ? 'no':'ok',
        data: results.length===0 ?{}: results }]);  
}


exports.importCertificates = async(req,res)=>{

//****************Passcode Validation******************/

const codes = await PassCodes.find({Passcode:req.body.payload['ps']});
if(codes.length ==0){
    res.status(200).json({err:1,msg:"Invalid Passcode"});
    res.end();
    return;
}
//***************************************************/


const Data = new stream.PassThrough();
//get all info from database to serve as a cache
const themes = await Themes.find( {}, { theme: 1, _id: 0 } );
const IDs = await Certificate.find({},{id:1,_id:0});

// sets are faster than arrays in lookups
const ThemesCache = new Set()
const DBIdCache = new Set()
const CSVIdCache = new Set()
const Certifcates = []; //This will hold all certificates info to add at once

//add data from database to the corresponding set
for(var i =0;i<themes.length;i++)
    ThemesCache.add(themes[i]['theme']);

for(var i =0;i<IDs.length;i++)
    DBIdCache.add(IDs[i]['id']);

var err=0; 
var CurrentRow=2;
var IsEmpty =0; // will identify wether the csv is empty or not

Data.write(req.body.payload['csv']);
Data.end();
Data.pipe(parse({ delimiter: ",", from_line: 2 }))
        .on("data",  function (row) {
            IsEmpty =1;
            if (err == 1)
                return;
            let AdditionalTexts = [];
            
            for(var i=2;i<row.length -1;i++){
                if(row[i] != undefined && row[i] != '')
                    AdditionalTexts.push(row[i]);
                else{
                    err = 1;
                    res.status(200).json({err:1,msg:"An attribute at row " + CurrentRow + " is undefined. No certificate is inserted"});
                    //console.log("An attribute at row " + Row + " is undefined");
                    res.end();
                    return;
                }
            }

            const CertificateData = {
                name: row[0],
                id: row[1],
                additionalTexts: AdditionalTexts,
                theme: row[row.length -1]
            };

            for (var key in CertificateData) {
                if ((CertificateData[key] == undefined) || (CertificateData[key] == '')) {
                    err = 1;
                    res.status(200).json({err:1,msg:"An attribute at row " + CurrentRow + " is undefined. No certificate is inserted"});
                    //console.log("An attribute at row " + Row + " is undefined");
                    res.end();
                    return;
                }
            }
                //Theme not found
            if(!ThemesCache.has(CertificateData['theme'])){
                err=1;
                res.status(200).json({err:1,msg:"Theme "+ CertificateData['theme'] + " at row "+ CurrentRow + " cannot be found. No certificate is inserted"});
                //console.log("Theme "+ CertificateData['theme'] + " at row "+ Row + " cannot be found");
                res.end();
                return;
            }
            //ID already exists
            if(DBIdCache.has(CertificateData['id'])){
                err=1;
                res.status(200).json({err:1,msg:"ID "+ CertificateData['id'] + " at row "+ CurrentRow + " already exists. No certificate is inserted"});
                //console.log("ID "+ CertificateData['id'] + " at row "+ Row + " already exists");
                res.end();
                return;
            }
            //Duplicate IDs in CSV
            if(CSVIdCache.has(CertificateData['id'])){
                err=1;
                res.status(200).json({err:1,msg:"ID "+ CertificateData['id'] + " at row " + CurrentRow + " is found 2 times or more in the CSV file. No certificate is inserted"});
                //console.log("ID "+ CertificateData['id'] + " at row " + Row + " is found 2 times or more in the CSV file");
               res.end();
                return;
            }
            CurrentRow++;
            CSVIdCache.add(CertificateData['id']);
            Certifcates.push(CertificateData); // add current certificate info to the array
        }).on("end", async function () {
            if(err==1)
                return;
            if(IsEmpty ==0){
                    res.status(200).json({err:1,msg:"No data found in CSV file."});
                    res.end();
                    return;
                }
            try {
                for(var i =0;i<Certifcates.length;i++){
                    const CertificatesSave = new Certificate({ 
                        ...Certifcates[i]
                    })
                    await CertificatesSave.save();
                }
            } catch (error) {
                err=1;
                console.log(error);
                res.status(200).json({err:1,msg:"An Unidentified Error Occurred. Some certificates may have been inserted"});
                res.end();
                return;
            }

            if(err==0){
                res.status(200).json({err:0,msg:"All certificates have been inserted successfully."});
                res.end();
            }
            

        })
}


//************************************************************************

    // let NamePosition = {
    //     Xstart: 167,
    //     Xend: 690,
    //     Ystart: 285,
    //     Yend:0,
    //     MinSize:1,
    //     MaxSize:180,
    // }
    // let NameColor={
    //     R:0,
    //     G:0,
    //     B:0,
    // }
    // let Data = [];

    // let TextData = {
    //     Position : NamePosition,
    //     Color : NameColor,
    //     Font : "Cinzel-Bold",
    // }
    // Data.push(TextData);

    // const CertificatesSave = new Themes({ 
    //     theme: "BeinMedia06",
    //     NameColor: NameColor,
    //     NameFont:"Cinzel-Bold",
    //     NamePosition:NamePosition,
    //     Data:Data,
    // })
    // CertificatesSave.save();

//****************************************************************


exports.ExtractPDF = async (req, res) => {

    //Security in case someone manually messed with the payload
    const results = await Certificate.find({id:req.body['payload']['id'],name:req.body['payload']['payload']['name']});
    if(results.length ==0){
        res.status(400);
        res.end();
        return;
    }
       
    const theme = req.body['payload']['payload']['theme'];
    const ThemeData = await Themes.find({theme:theme});
    const PDFpath = path.join(
        __dirname,
        "..",
        "..",
        "static",
        "CertificateThemes",
        theme+".pdf"
    );
    const exBytes = fs.readFileSync(PDFpath, null).buffer;
    const pdfDoc = await PDFlib.PDFDocument.load(exBytes)
    pdfDoc.registerFontkit(fontkit);
    const pages = pdfDoc.getPages();
    const firstP = pages[0];

    for(var i=0;i<=req.body['payload']['payload']['additionalTexts'].length;i++){
        const Xend = parseInt(ThemeData[0]['Data'][i]['Position']['Xend']);
        const Xstart = parseInt(ThemeData[0]['Data'][i]['Position']['Xstart']);
        const Ystart = parseInt(ThemeData[0]['Data'][i]['Position']['Ystart']);
        // Yend not needed
        const MinSize = parseInt(ThemeData[0]['Data'][i]['Position']['MinSize']);
        const MaxSize = parseInt(ThemeData[0]['Data'][i]['Position']['MaxSize']);
        const ColorR = parseInt(ThemeData[0]['Data'][i]['Color']['R']);
        const ColorG = parseInt(ThemeData[0]['Data'][i]['Color']['G']);
        const ColorB = parseInt(ThemeData[0]['Data'][i]['Color']['B']);
        const ThemeFont = ThemeData[0]['Data'][i]['Font'];

        const Text2Write = i==0? req.body['payload']['payload']['name']: req.body['payload']['payload']['additionalTexts'][i-1];
        const FontPath = path.join(
            __dirname,
            "..",
            "..",
            "static",
            "Fonts",
            ThemeFont+".ttf"
        );

        const exFont = fs.readFileSync(FontPath,null).buffer;
        const Font = await pdfDoc.embedFont(exFont);

    //Calculate Font Size and center the text
    const FontSize = getFontSizeForWidth(Text2Write, Xend-Xstart,Font,MinSize,MaxSize);
    const width = Font.widthOfTextAtSize(Text2Write, FontSize);;
    const StartLocation = ((Xend+Xstart) - width)/2;

     firstP.drawText(Text2Write,{
        x:StartLocation,
        y:Ystart,
        size:FontSize,
        font:Font,
        color: PDFlib.rgb(ColorR, ColorG, ColorB)
    })

    }



    const uri = await pdfDoc.saveAsBase64(); 
    res.end(uri);
}

function getFontSizeForWidth(string, maxWidth,font,minFontSize=1,maxFontSize=180) {
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

  

