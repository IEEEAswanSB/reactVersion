const express = require('express')
const router = express.Router()

const {
    visitorRegister,
    exportVisitors
} = require('../controllers/visitor.controller')

const {
    applicantRegister,
    exportApplicants
} = require('../controllers/applicant.controller')

const {
    techtipRegister,
    exportTechtip
} = require('../controllers/techtip.controller')

const {
    contactReg,
    exportContact
} = require('../controllers/contact.controller')

const {
    validateCertificate,
    ExtractPDF,
    importCertificates
} = require('../controllers/certificate.controller')

const {
    beincampRegister,
    exportBeincamp,
    exportBeinTicket
} = require('../controllers/beincamp.controller')

const{
    sendcodestormuser
} = require('../controllers/codestorm.controller')

//router.post('/api/visitor', visitorRegister)

router.get('/api/export-visitors', exportVisitors)


//router.post('/api/applicant', applicantRegister)

router.get('/api/export-applicants', exportApplicants)


router.post('/api/techtip', techtipRegister)
router.get('/api/export-techtip', exportTechtip)

router.post('/api/contact', contactReg)
router.get('/api/export-contact', exportContact)

router.post('/api/validate-certificate',validateCertificate)

router.post('/api/extract-pdf', ExtractPDF)

router.post('/api/import-certificates',importCertificates)

router.post('/api/bein-camp',beincampRegister)
router.get('/api/export-beincamp', exportBeincamp)


router.post('/api/export-beinticket', exportBeinTicket)

router.post('/api/send-users',sendcodestormuser)
module.exports = router