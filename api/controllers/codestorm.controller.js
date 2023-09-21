const CodeSormapplicant = require('../models/codestormapplicant.model')
const {checkName,checkEmail,checkPhone, checkPSwebsites, checkNationalId} = require('../Helpers/Validators')
const path = require("path");
const fs = require("fs");
const { Parser } = require("json2csv");

exports.sendcodestormuser = async (req, res) => {
    try{
    let rec = req.body
    // if(checkName(rec.payload['name'])){
    //     res.status(422).json([{
    //         message: 'Enter a valid name!'
    //     }])
    //     return;
    // }

    // if(checkNationalId(rec.payload['id'])){
    //     res.status(422).json([{
    //         message: 'Enter a valid national id!'
    //     }])
    //     return;
    // }


    // if(checkEmail(rec.payload['email'])){
    //     res.status(422).json([{
    //         message: 'Enter a valid email!'
    //     }])

    //     return;
    // }

    // if(checkPhone(rec.payload['phone'])){
    //     res.status(422).json([{
    //         message: 'Enter a valid phone!'
    //     }])     
    //     return;
    // }

    // if(checkPSwebsites(rec.payload['favHandler'])){
    //     res.status(422).json([{
    //         message: 'Enter a valid website!'
    //     }])
    //     return;
    // }


    const applicant = new CodeSormapplicant({
        ...rec.payload
    })
    await applicant.save();
    res.status(201).json([{
        message: 'Registered successfully!'
    }]);  
    }catch(err){
        console.log(err);

        // if (err.name === 'MongoError' && err.code === 11000) {
            
        //     if(err.keyValue['id'])
        //         return res.status(422).send({message: 'Id already exist!' });
        //     else if(err.keyValue['email'])
        //         return res.status(422).send({message: 'Email already exist!' });
        //     else if(err.keyValue['phone'])
        //         return res.status(422).send({message: 'Phone already exist!' });
        //   }


        res.status(422).json([{
            message: 'Something went wrong!'
        }])
    }

}

exports.exportCodeStorm = async (req, res) => {
    const fields = [
        "createdAt",
        "name",
        "email",
        "favHandler",
        "handler",
        "phone",
        "id",
        "university",
        "college"
    ];
    const opts = { fields };
    const results = await CodeSormapplicant.find({});
    const dateTime = new Date().getTime();
    const filePath = path.join(
        __dirname,
        "..",
        "..",
        "public",
        "exports",
        "CodeStorm-" + dateTime + ".csv"
    );

    const parser = new Parser(opts);
    const csv = parser.parse(results);
    //
    fs.writeFile(filePath, csv, function (err) {
        if (err) {
        return res.json(err).status(500);
        } else {
        setTimeout(function () {
            fs.unlinkSync(filePath); // delete this file after 30 seconds
        }, 30000);
        //  return res.download("../public/exports/csv-" + dateTime + ".csv");
        return res.download(filePath);
        }
    });
}

  

