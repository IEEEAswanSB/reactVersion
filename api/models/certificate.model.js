const mongoose = require("mongoose");
const Schema = mongoose.Schema

const certificateSchema = new Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    additionalTexts:{
        type: Array,
        default: []
    },

    theme:{
        type: String,
        required:true
    }

    
},{ timestamps: true });
certificateSchema.methods.toJSON = function () {
  const certificateSchema = this.toObject();
  return certificateSchema;
};

module.exports = mongoose.model("Certificate", certificateSchema);;
