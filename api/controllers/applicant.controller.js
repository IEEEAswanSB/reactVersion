const Applicant = require('../models/applicant.model')

const path = require("path");
const fs = require("fs");
const { Parser } = require("json2csv");


exports.applicantRegister = async (req, res) => {
    try {
        const applicant = new Applicant({ 
            ...req.body.payload
        })
        await applicant.save()
        res.status(201).json({ applicant });
    } catch(error) {
        console.log({ error })
        const { errors:errs } = error
        if (errs && errs.length) {
            const errors = []
            Object.keys(errs).forEach((key) => {
                errors.push({
                    field: key,
                    type: errs[key].name,
                    message: errs[key].message
                })
            })
            res.status(422).json(error)
        } else {
            res.status(422).json([{
                field: 'id',
                type: 'ValidationError',
                message: 'This id is already registered!'
            }])
        }
    }
}
exports.exportApplicants = async (req, res) => {
    const fields = [
        "createdAt",
        "name",
        "email",
        "phone",
        "birth",
        "id",
        "university",
        "otherUniversity",
        "faculty",
        "otherFaculties",
        "year",
        "committee",
        "tech1",
        "tech2",
        "tech3",
        
    ];
    const opts = { fields };
    const results = await Applicant.find({});
    const dateTime = new Date().getTime();
    const filePath = path.join(
        __dirname,
        "..",
        "..",
        "public",
        "exports",
        "applicants-" + dateTime + ".csv"
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