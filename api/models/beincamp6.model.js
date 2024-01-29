const mongoose = require("mongoose");
const Schema = mongoose.Schema

const beincamp6Schema = new Schema({
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
    department: {
        type: String,
        required: true
    },
    track:{
        type: String,
        required: true
    },   
    certificateName:{
        type: String,
        required: true
    },   
    validated:{
        type: Boolean,
        default: false
    },
    TicketID:{
        type: String,
        default: "",
        unique: true
    },
    PaymentImg:{
        type: String,
        required: true
    },
    Day1:{
        type: Boolean,
        default: false
    },
    Day2:{
        type: Boolean,
        default: false
    },
    Day3:{
        type: Boolean,
        default: false
    },
    Day4:{
        type: Boolean,
        default: false
    },
    Day5:{
        type: Boolean,
        default: false
    },
    
},{ timestamps: true });
beincamp6Schema.methods.toJSON = function () {
  const beincamp6Schema = this.toObject();
  return beincamp6Schema;
};

module.exports = mongoose.model("beincamp6", beincamp6Schema);
