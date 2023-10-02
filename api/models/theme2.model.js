// models/applicant.js
const mongoose = require('mongoose');

const theme2Schema = new mongoose.Schema({
 
  theme: {
    type: String,
    required: true,
    unique: true
},
Xstart: {
    type: String,
    required: true
},
Xend:{
    type: String,
    required: true
},
Y:{
    type: String,
    required:true
},
ColorR:{
    type: String,
    required:true
},
ColorG:{
    type: String,
    required:true
},
ColorB:{
    type: String,
    required:true
},
UseDate:{
    type: String,
    required:true
},

DateX:{
    type: String,
    required:true
},
DateY:{
    type: String,
    required:true
},
DateSize:{
    type: String,
    required:true
},
DateR:{
    type: String,
    required:true
},
DateG:{
    type: String,
    required:true
},
DateB:{
    type: String,
    required:true
},



Font:{
    type: String,
    required:true
}



 },{ timestamps: true });

 theme2Schema.methods.toJSON = function () {
  const theme2Schema = this.toObject();
  return theme2Schema;
};

const theme2Model = mongoose.model('theme2', theme2Schema);

module.exports = theme2Model;
