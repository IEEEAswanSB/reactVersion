// models/applicant.js
const mongoose = require("mongoose");

const CodeStormApplicantSchema25 = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    favPlatform: {
      type: String,
      required: true,
    },
    handler: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    university: {
      type: String,
      required: true,
    },
    college: {
      type: String,
      required: true,
    },
    id: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

const CodeStormApplicant25 = mongoose.model(
  "CodeStormApplicant",
  CodeStormApplicantSchema25
);

module.exports = CodeStormApplicant25;
