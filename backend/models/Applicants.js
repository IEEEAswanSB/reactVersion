// models/applicant.js
const mongoose = require('mongoose');

const applicantSchema = new mongoose.Schema({
  name: String,
  email: String,
  favHandler:String,
  handler:String,
  phone:String,
 });

const Applicant = mongoose.model('applicants', applicantSchema);

module.exports = Applicant;
