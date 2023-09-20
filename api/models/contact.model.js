const mongoose = require("mongoose");
const Schema = mongoose.Schema

const contactSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    message:{
        type: String,
        required: true
    },
},{ timestamps: true });
contactSchema.methods.toJSON = function () {
  const contactSchema = this.toObject();
  return contactSchema;
};

module.exports = mongoose.model("contact", contactSchema);;
