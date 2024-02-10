const mongoose = require("mongoose");
const Schema = mongoose.Schema

const themeSchema = new Schema({
    theme: {
        type: String,
        required: true,
        unique: true
    },

    NamePosition:{
        type: Object,
        required: true
    },

    NameColor:{
        type:Object,
        required:true
    },

    NameFont:{
        type: String,
        required:true
    },

    Data:{
        type: Array,
        default: []
    },
    QR:{
        type: Object,
        default: {}
    }

  
},{ timestamps: true });
themeSchema.methods.toJSON = function () {
  const themeSchema = this.toObject();
  return themeSchema;
};

module.exports = mongoose.model("Theme", themeSchema);;
