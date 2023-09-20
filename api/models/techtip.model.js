const mongoose = require("mongoose");
const Schema = mongoose.Schema

const techtipSchema = new Schema({
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
},{ timestamps: true });
techtipSchema.methods.toJSON = function () {
  const techtipSchema = this.toObject();
  return techtipSchema;
};

module.exports = mongoose.model("techtip", techtipSchema);;
