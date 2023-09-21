// models/applicant.js
const mongoose = require('mongoose');

const CodeSormapplicantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
},
  email: {
    type: String,
    required: true,
    //  unique: true,
},
  favHandler:{
    type: String,
    required: true
},
  handler:{
    type: String,
    required: true,
},
  phone:{
    type: String,
    required: true,
    //  unique:true,
},
  university:{
    type: String,
    required: true
},
  college:{
    type: String,
    required: true
},
  id:{
    type: String,
    required: true,
    //  unique: true,
},
 },{ timestamps: true });

const CodeSormapplicant = mongoose.model('CodeStormApplicant', CodeSormapplicantSchema);

module.exports = CodeSormapplicant;
