require("dotenv").config();
const express = require("express");
const app = express();
const { Parser } = require("json2csv");
const cors = require('cors')
const path = require("path");
const fs = require("fs");
// const port = process.env.PORT || 8080; // for development
const port = process.env.PORT || 3000; // for deployment
const rateLimit = require("express-rate-limit");
const Project = require("./project.model");
const fields = [
  "phone",
  "email",
  "project_type",
  "project_title",
  "project_category",
  "project_track",
  "project_abstract",
  "project_file",
  "hasPrototype",
  "prototype_dimension",
  "university",
  "faculty",
  "governorate",
  "school",
  "educational_level",
  "total_payment",
  "project_supervisor",
  "team_members_count",
  "team_members",
];
const opts = { fields };

require("./connection");

const errorHand = (error, req, res, next) => {
  res.status(400).send({ error: error.message });
};

// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 minutes
//   max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
//   standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
//   legacyHeaders: false, // Disable the `X-RateLimit-*` headers
// });

const visitorRoutes = require('./routes/api.routes')

app.use(cors())
// app.use(limiter);
//---------- Don't Forget To Modify Nginx max upload size----------
app.use(express.json({limit: '25mb'}));//                         |
app.use(express.urlencoded({ extended: true, limit: '25mb' }));// |
//----------------------------------------------------------------
app.use(errorHand);

app.use(visitorRoutes)

// routes.

app.post("/api/project", async (req, res) => {
  try {
    const project = new Project({ ...req.body.payload });
    const result = await project.save();
    res.status(200).send({ data: project });
  } catch (error) {
    res.status(400).send({ error: "this email has been registered!" });
    // res.status(400).send({ error });
  }
});

app.get("/api/exportcsvforaswan", async (req, res) => {
  const results = await Project.find({});
  // console.log(results);
  const dateTime = new Date().getTime();
  const filePath = path.join(
    __dirname,
    "..",
    "public",
    "exports",
    "csv-" + dateTime + ".csv"
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
});

app.listen(port, () => {
  console.log("Server is up on port " + port);
});
