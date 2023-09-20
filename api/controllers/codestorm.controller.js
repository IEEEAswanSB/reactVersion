const Applicants = require('../models/Applicants')

exports.sendcodestormuser = async (req, res) => {
    let rec = req.body
    // console.log(rec.payload);


    Applicants.insertMany(rec.payload)
    res.status(201);  

    // console.log("DOOONNE")
}


  

