// models/applicant.js
const mongoose = require("mongoose");

const CodeSormapplicantSchema = new mongoose.Schema(
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
    favoritePlatform: {
      type: String,
      required: true,
    },
    handle: {
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
    faculty: {
      type: String,
      required: true,
    },
    id: {
      type: String,
      required: true,
      unique: true,
    },
    academicYear: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);


const CodeSormapplicant = mongoose.model(
  "codestormapplicant25",
  CodeSormapplicantSchema
);

module.exports = CodeSormapplicant;
