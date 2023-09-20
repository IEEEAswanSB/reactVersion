const mongoose = require("mongoose");
const Schema = mongoose.Schema

const beincampSchema = new Schema({
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
        default: ""
    },
    
    PaymentImg:{
        type: String,
        required: true
    }
},{ timestamps: true });
beincampSchema.methods.toJSON = function () {
  const beincampSchema = this.toObject();
  return beincampSchema;
};

module.exports = mongoose.model("beincamp", beincampSchema);;
