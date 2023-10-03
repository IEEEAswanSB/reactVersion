import { api } from "./api";

export const register = payload => {
    return api.post('project', {payload}).then(res => res.data)
}

export const registerVisitor = payload => {
    return api.post('visitor', {payload}).then(res => res.data)
}

export const registerApplicant = payload => {
    return api.post('applicant', {payload}).then(res => res.data)
}

export const registerTechtip = payload => {
    return api.post('techtip', {payload}).then(res => res.data)
}

/*export const registerBeinCamp = payload => {
    return api.post('bein-camp', {payload}).then(res => res.data)
}*/

export const contactsReg = payload => {
    return api.post('contact', {payload}).then(res => res.data)
}

export const validateCertificate = payload => {
    return api.post('validate-certificate', {payload}).then(res => res.data)
}

export const ExtractPDF = payload => {
    return api.post('extract-pdf', {payload}).then(res => res.data)
}

export const ImportCertificates = payload => {
    return api.post('import-certificates', {payload}).then(res => res.data)
}

export const ExportBeinCampTicket = payload => {
    return api.post('export-beinticket', {payload}).then(res => res.data)
}

export const sendUsers = payload => {
    return api.post('send-users', {payload}).then(res => res.data)
}

export const ExportCodeStormTicket = payload => {
    return api.post('export-codestormticket', {payload}).then(res => res.data)
}


export const VerifyCodeStormService = payload => {
    return api.post('verify-codestorm', {payload}).then(res => res.data)
}

export const CodeStormEmail = payload => {
    return api.post('codestorm-email', {payload}).then(res => res.data)
}