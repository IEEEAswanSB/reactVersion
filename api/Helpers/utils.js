const path = require("path");
const fs = require("fs");
const Themes = require("../models/theme.model");
const PDFlib = require("pdf-lib");
const fontkit = require("fontkit");
const qr = require("qrcode");
const nodemailer = require("nodemailer");

/* status 0 => lower case
 * status 1 => upper case
 * status 2 => numbers only
 * status 3 => lower case + upper case
 * status 4 => lower case + numbers
 * status 5 => upper case + numbers
 * status 6 => all
 */

exports.randomString = (len, status = 0) => {
  let characters = "";
  switch (status) {
    case 0:
      characters = "abcdefghijklmnopqrstuvwxyz";
      break;
    case 1:
      characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      break;
    case 2:
      characters = "0123456789";
      break;
    case 3:
      characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
      break;
    case 4:
      characters = "abcdefghijklmnopqrstuvwxyz0123456789";
      break;
    case 5:
      characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
      break;
    case 6:
    default:
      characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      break;
  }
  const charactersLength = characters.length;
  let randomString = "";
  for (let i = 0; i < len; i++) {
    randomString += characters.charAt(
      Math.floor(Math.random() * charactersLength)
    );
  }
  return randomString;
};

/*
 function to convert string to title case
 example: input => "hello world" output => "Hello World"
*/
exports.titleCase = (str) => {
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
};

exports.makePDF = async (theme, data /* Array */, QRdata) => {
  const ThemeData = await Themes.findOne({ theme: theme });
  const PDFpath = path.join(
    __dirname,
    "..",
    "..",
    "static",
    "CertificateThemes",
    theme + ".pdf"
  );
  const exBytes = fs.readFileSync(PDFpath, null).buffer;
  const pdfDoc = await PDFlib.PDFDocument.load(exBytes);
  pdfDoc.registerFontkit(fontkit);
  const pages = pdfDoc.getPages();
  const firstP = pages[0];

  for (let i = 0; i < data.length; i++) {
    const Xend = parseInt(ThemeData["Data"][i]["Position"]["Xend"]);
    const Xstart = parseInt(ThemeData["Data"][i]["Position"]["Xstart"]);
    const Ystart = parseInt(ThemeData["Data"][i]["Position"]["Ystart"]);
    // Yend not needed
    const MinSize = parseInt(ThemeData["Data"][i]["Position"]["MinSize"]);
    const MaxSize = parseInt(ThemeData["Data"][i]["Position"]["MaxSize"]);
    const ColorR = parseFloat(ThemeData["Data"][i]["Color"]["R"]);
    const ColorG = parseFloat(ThemeData["Data"][i]["Color"]["G"]);
    const ColorB = parseFloat(ThemeData["Data"][i]["Color"]["B"]);
    const ThemeFont = ThemeData["Data"][i]["Font"];

    const Text2Write = data[i];
    const FontPath = path.join(
      __dirname,
      "..",
      "..",
      "static",
      "Fonts",
      ThemeFont + ".ttf"
    );

    const exFont = fs.readFileSync(FontPath, null).buffer;
    const Font = await pdfDoc.embedFont(exFont);

    //Calculate Font Size and center the text
    const FontSize = getFontSizeForWidth(
      Text2Write,
      Xend - Xstart,
      Font,
      MinSize,
      MaxSize
    );
    const width = Font.widthOfTextAtSize(Text2Write, FontSize);
    const StartLocation = (Xend + Xstart - width) / 2;

    firstP.drawText(Text2Write, {
      x: StartLocation,
      y: Ystart,
      size: FontSize,
      font: Font,
      color: PDFlib.rgb(ColorR, ColorG, ColorB),
    });
  }

  if (QRdata) {
    const qrCodeImage = await generateQRCode(QRdata);
    const qrCodeImageXObject = await pdfDoc.embedPng(qrCodeImage);
    const qrCodeImageDims = qrCodeImageXObject.scale(ThemeData["QR"]["scale"]); // Scale the image size

    firstP.drawImage(qrCodeImageXObject, {
      x: ThemeData["QR"]["x"],
      y: ThemeData["QR"]["y"],
      width: qrCodeImageDims.width,
      height: qrCodeImageDims.height,
    });
  }

  const uri = await pdfDoc.saveAsBase64({ dataUri: true });
  pdfDoc.sa;
  return uri;
};

const getFontSizeForWidth = (string, maxWidth, font) => {
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
};

const generateQRCode = async (text) => {
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
    // throw error;
  }
};

let mailTransporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE,
  pool: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  from: process.env.EMAIL_USER,
});

exports.sendMail = async (to, subject, body, attachments = [], callback) => {
  let mailDetails = {
    from: process.env.EMAIL_USER,
    to: to,
    subject: subject,
    text: body,
    attachments: attachments,
  };

  mailTransporter.sendMail(
    mailDetails,
    callback ||
      function (err, data) {
        if (err) {
          console.log(`Error happened for email ${to} with error: ${err}`);
        } else {
          console.log(`Email sent for ${to}`);
        }
      }
  );
};
