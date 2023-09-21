// models/applicant.js
const mongoose = require('mongoose');

const CodeSormapplicantSchema = new mongoose.Schema({
  name: String,
  email: String,
  favHandler:String,
  handler:String,
  phone:String,
 });

const CodeSormapplicant = mongoose.model('CodeStormApplicant', CodeSormapplicantSchema);

module.exports = CodeSormapplicant;
