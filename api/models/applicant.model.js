const mongoose = require("mongoose");
const Schema = mongoose.Schema

const applicantSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    phone: String,
    birth:{
        type: String,
        required: true
    },
    id: {
        type: String,
        required: true,
        unique: true
    },
    university: {
        type: String,
        required: true
    },
    otherUniversity:{
        type: String
    },
    faculty: {
        type: String,
        required: true
    },
    otherFaculties:{
        type: String
    },
    year: {
        type: String,
        required: true
    },
    committee: {
        type: String,
        required: true
    },
    tech1: {
        type: String,
        
    },
    tech2: {
        type: String,
        
    },
    tech3: {
        type: String,
        
    }
},{ timestamps: true });
applicantSchema.methods.toJSON = function () {
  const applicantSchema = this.toObject();
  return applicantSchema;
};

module.exports = mongoose.model("Applicant", applicantSchema);;
