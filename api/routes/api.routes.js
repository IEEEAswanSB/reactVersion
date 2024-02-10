const express = require("express");
const router = express.Router();

const {
  visitorRegister,
  exportVisitors,
} = require("../controllers/visitor.controller");

const {
  applicantRegister,
  exportApplicants,
} = require("../controllers/applicant.controller");

const {
  techtipRegister,
  exportTechtip,
} = require("../controllers/techtip.controller");

const {
  contactReg,
  exportContact,
} = require("../controllers/contact.controller");

const {
  validateCertificate,
  ExtractPDF,
  importCertificates,
  sendMail,
} = require("../controllers/certificate.controller");

const {
  beincampRegister,
  exportBeincamp,
  exportBeinTicket,
} = require("../controllers/beincamp.controller");

const {
    beincamp6Register,
    beincamp6Validate,
    beincamp6recordAttendance,
    beincamp6GenerateTicket,
    beincamp6SendTicket
} = require('../controllers/beincamp6.controller')

const {
  sendcodestormuser,
  exportCodeStorm,
  exportCodeStormTicket,
  VerifyCodeStorm,
} = require("../controllers/codestorm.controller");

//router.post('/api/visitor', visitorRegister)

router.get("/api/export-visitors", exportVisitors);

//router.post('/api/applicant', applicantRegister)

router.get("/api/export-applicants", exportApplicants);

router.post("/api/techtip", techtipRegister);
router.get("/api/export-techtip", exportTechtip);

router.post("/api/contact", contactReg);
router.get("/api/export-contact", exportContact);

router.post("/api/validate-certificate", validateCertificate);

router.post("/api/extract-pdf", ExtractPDF);

router.post("/api/import-certificates", importCertificates);

router.post("/api/bein-camp", beincampRegister);
router.get("/api/export-beincamp", exportBeincamp);

router.post("/api/export-beinticket", exportBeinTicket);

// router.post('/api/send-users',sendcodestormuser)
router.get("/api/export-codestorm", exportCodeStorm);

router.post("/api/export-codestormticket", exportCodeStormTicket);

router.post("/api/verify-codestorm", VerifyCodeStorm);

router.post("/api/codestorm-email", sendMail);

router.post("/api/bein6-register", beincamp6Register);

router.post('/api/bein6-validate', beincamp6Validate)

router.post("/api/bein6-record-attendance", beincamp6recordAttendance);

router.post('/api/bein6-generate-ticket', beincamp6GenerateTicket)

router.post('/api/bein6-send-ticket', beincamp6SendTicket)


module.exports = router
