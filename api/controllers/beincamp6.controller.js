const Beincamp6 = require("../models/beincamp6.model");
const Passcodes = require("../models/passcodes.model");

const Themes = require("../models/theme.model");
const path = require("path");
const PDFlib = require("pdf-lib");
const fontkit = require("fontkit");
const sharp = require("sharp");
const fs = require("fs");
const {
  checkName,
  checkLatinName,
  checkEmail,
  checkPhone,
  checkNationalId,
  checkImg,
} = require("../Helpers/Validators");
const { randomString } = require("../Helpers/utils");
const { google } = require("googleapis");
const { Readable } = require("stream");
const axios = require("axios");

const credentials = require("../../ieee-aswan-creds.json");

const auth = new google.auth.GoogleAuth({
  credentials: credentials,
  scopes: [
    "https://www.googleapis.com/auth/spreadsheets",
    "https://www.googleapis.com/auth/drive",
  ],
});

const sheetsAPI = google.sheets({
  version: "v4",
  auth: auth,
});

const driveAPI = google.drive({ version: "v3", auth: auth });

const sheets = google.sheets("v4");
const spreadsheetId = "1SRZBNA8-l6hCdutRGLCJjhCfJTFIM45Rsik_PLHhUUc";
const range = "Sheet1!A1:Z";

exports.beincamp6Register = async (req, res) => {
  try {
    let { name, email, phone, certificateName, id, Captcha } = req.body;
    let paymentImage = req?.files?.image;

    if (!name || !email || !phone || !id || !certificateName || !paymentImage) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }

    const captchaVerify = axios.create({
      baseURL: "https://www.google.com/recaptcha/api/siteverify",
    });

    let { data: captchaRes } = await captchaVerify.post("", null, {
      params: {
        secret: "6LfZR2YpAAAAAPYnVO7hVnZhCFbqPR9dbppKx-GV",
        response: Captcha,
      },
    });

    if (!captchaRes.success) {
      return res
        .status(400)
        .json({ message: "Please verify that you are not a robot" });
    }

    if (checkName(name)) {
      return res.status(400).json({ message: "Please enter a valid name" });
    }

    if (checkLatinName(certificateName)) {
      return res
        .status(400)
        .json({ message: "Please enter a valid certificate name" });
    }

    if (checkEmail(email)) {
      return res.status(400).json({ message: "Please enter a valid email" });
    }

    if (checkPhone(phone)) {
      return res.status(400).json({ message: "Please enter a valid phone" });
    }

    if (checkNationalId(id)) {
      return res
        .status(400)
        .json({ message: "Please enter a valid national ID" });
    }

    let imgStatus = await checkImg(paymentImage.data);

    if (imgStatus)
      return res.status(400).json({ message: "Please enter a valid image" });

    const TicketID = randomString(5, 2) + "-" + "B6" + "-" + randomString(5, 2);

    let mongoRes = await Beincamp6.findOne({
      $or: [
        { email: email },
        { id: id },
        { phone: phone },
        { TicketID: TicketID },
      ],
    });

    if (mongoRes) {
      return res
        .status(400)
        .json({ message: "This user is already registered" });
    }

    const convertedImage = await sharp(paymentImage.data)
      .toFormat("webp")
      .toBuffer();

    let { data: driveRes } = await driveAPI.files.create({
      media: {
        mimeType: "image/webp",
        body: Readable.from(convertedImage),
      },
      requestBody: {
        name: TicketID + ".webp",
        parents: ["1SgsC69z1gqcr7yEQkrbOVE-jsB0KTLxO"],
      },
      fields: "id",
    });

    const beincamp = new Beincamp6({
      ...req.body,
      TicketID: TicketID,
      PaymentImg: `https://drive.google.com/file/d/${driveRes.id}/preview`,
    });

    await beincamp.save();

    await saveGoogleSheet();

    return res.status(200).json({ message: "Registered Successfully" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.beincamp6Validate = async (req, res) => {
  try {
    let { TicketID,Password } = req.body;
    if (!TicketID || !Password) {
      return res
        .status(400)
        .json({ message: "Please enter a valid Ticket ID and Password" });
    }

    let mongoRes = await Beincamp6.findOne({ TicketID: TicketID });

    let mongoRes2 = await Passcodes.findOne({ Passcode: Password });

    if(!mongoRes2){
      return res.status(400).json({ message: "Incorrect Password" });
    }

    if (!mongoRes) {
      return res.status(400).json({ message: "This user is not registered" });
    }

    if (mongoRes.validated) {
      return res
        .status(400)
        .json({ message: "This user is already validated" });
    }

    await Beincamp6.updateOne({ TicketID: TicketID }, { validated: true });

    await saveGoogleSheet();

    return res.status(200).json({ message: "Validated Successfully" });
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.beincamp6recordAttendance = async (req, res) => {
  try {
    let { TicketID } = req.body;
    if (!TicketID) {
      return res
        .status(400)
        .json({ message: "Please enter a valid Ticket ID" });
    }

    let mongoRes = await Beincamp6.findOne({ TicketID: TicketID });

    if (!mongoRes) {
      return res.status(400).json({ message: "This user is not registered" });
    }

    if (!mongoRes.validated) {
      return res
        .status(400)
        .json({ message: `${mongoRes.name} is not validated` });
    }

    let Days = [
      1707602400000, 1707688800000, 1707775200000, 1707861600000, 1707948000000,
    ];

    let today = new Date().getTime();

    let todayIndex = Days.findIndex(
      (day) => today >= day && today < day + 86400000
    );

    if (todayIndex === -1) {
      return res.status(400).json({ message: "Today is not a valid day" });
    }

    let day = "Day" + (todayIndex + 1);

    if (mongoRes[day]) {
      return res
        .status(400)
        .json({ message: `${mongoRes.name} is already attended today` });
    }

    await Beincamp6.updateOne({ TicketID: TicketID }, { [day]: true });

    await saveGoogleSheet();

    return res
      .status(200)
      .json({ message: `${mongoRes.name} Attendance recorded Successfully` });
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const saveGoogleSheet = async () => {
  let Columns = [
    [
      "createdAt",
      "id",
      "name",
      "certificateName",
      "email",
      "phone",
      "birth",
      "university",
      "otherUniversity",
      "faculty",
      "otherFaculties",
      "year",
      "department",
      "track",
      "TicketID",
      "validated",
      "PaymentImg",
      "Day1",
      "Day2",
      "Day3",
      "Day4",
      "Day5",
    ],
  ];

  // const results = await Beincamp6.find({}).sort({ field1: 1, field2: -1 });

  let projectStage = {
    attendedDays: {
      $sum: [
        { $cond: [{ $eq: ["$Day1", true] }, 1, 0] },
        { $cond: [{ $eq: ["$Day2", true] }, 1, 0] },
        { $cond: [{ $eq: ["$Day3", true] }, 1, 0] },
        { $cond: [{ $eq: ["$Day4", true] }, 1, 0] },
        { $cond: [{ $eq: ["$Day5", true] }, 1, 0] },
      ],
    },
  };

  Columns[0].forEach((field) => {
    projectStage[field] = `$${field}`;
  });

  const results = await Beincamp6.aggregate([
    {
      $project: projectStage,
    },
    { $sort: { validated: -1, attendedDays: -1, createdAt: 1 } },
  ]);

  results.forEach((element) => {
    let data = [];
    Columns[0].forEach((column, index) => {
      data.push(element[column]);
    });
    Columns.push(data);
  });

  sheetsAPI.spreadsheets.values.batchUpdate({
    spreadsheetId,
    resource: {
      valueInputOption: "RAW",
      data: [
        {
          range: "Sheet1!A1:Z",
          values: Columns,
        },
      ],
    },
  });

  const checkboxFormat = {
    repeatCell: {
      cell: { dataValidation: { condition: { type: "BOOLEAN" } } },
      range: {
        sheetId: 0,
        startRowIndex: 1,
        endRowIndex: results.length + 1,
        startColumnIndex: 15,
        endColumnIndex: 16,
      },
      fields: "dataValidation",
    },
  };

  const checkboxFormat2 = {
    repeatCell: {
      cell: { dataValidation: { condition: { type: "BOOLEAN" } } },
      range: {
        sheetId: 0,
        startRowIndex: 1,
        endRowIndex: results.length + 1,
        startColumnIndex: 17,
        endColumnIndex: 22,
      },
      fields: "dataValidation",
    },
  };

  sheetsAPI.spreadsheets.batchUpdate({
    spreadsheetId,
    resource: {
      requests: [checkboxFormat],
    },
  });

  sheetsAPI.spreadsheets.batchUpdate({
    spreadsheetId,
    resource: {
      requests: [checkboxFormat2],
    },
  });
};
