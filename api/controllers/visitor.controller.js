const Visitor = require('../models/visitor.model')

const path = require("path");
const fs = require("fs");
const { Parser } = require("json2csv");


exports.visitorRegister = async (req, res) => {
    try {
        const { 
            hasAccommodation, 
            hasMeals,
            hasMaterials
        } = req.body.payload
        let totalAmount = 50
        if (hasAccommodation) totalAmount += 550
        if (hasMeals) totalAmount += 200
        if (hasMaterials) totalAmount += 100
        const visitor = new Visitor({ 
            ...req.body.payload,
            totalAmount
        })
        await visitor.save()
        res.status(201).json({ visitor });
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
exports.exportVisitors = async (req, res) => {
    const fields = [
        "name",
        "email",
        "phone",
        "id",
        "university",
        "faculty",
        "hasAccommodation",
        "hasMeals",
        "hasMaterials",
        "totalAmount",
        "invoice",
        "createdAt"
    ];
    const opts = { fields };
    const results = await Visitor.find({});
    const dateTime = new Date().getTime();
    const filePath = path.join(
        __dirname,
        "..",
        "..",
        "public",
        "exports",
        "visitors-" + dateTime + ".csv"
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