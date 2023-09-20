const mongoose = require("mongoose");
const Schema = mongoose.Schema

const visitorSchema = new Schema({
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
    id: {
        type: String,
        required: true,
        unique: true
    },
    university: {
        type: String,
        required: true
    },
    faculty: {
        type: String,
        required: true
    },
    hasAccommodation: {
        type: Boolean,
        default: false
    },
    hasMeals: {
        type: Boolean,
        default: false
    },
    hasMaterials: {
        type: Boolean,
        default: false
    },
    totalAmount: Number,
    invoice: {
        type: String,
        required: true
    }
},{ timestamps: true });
visitorSchema.methods.toJSON = function () {
  const visitorSchema = this.toObject();
  return visitorSchema;
};

module.exports = mongoose.model("Visitor", visitorSchema);;
