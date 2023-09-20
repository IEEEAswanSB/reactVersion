const mongoose = require("mongoose");
const Schema = mongoose.Schema

const passCodesSchema = new Schema({
    Passcode: {
        type: String,
        required: true,
        unique: true
    }

   
},{ timestamps: true });
passCodesSchema.methods.toJSON = function () {
  const passCodesSchema = this.toObject();
  return passCodesSchema;
};

module.exports = mongoose.model("PassCodes", passCodesSchema);;
