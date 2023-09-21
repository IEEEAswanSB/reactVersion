const imageValidation = require('image-validation').default

// A valid name is a name that contains only latin letters, Arabic letters and spaces and has a length between 2 and 30 characters.
// returns true if the name is invalid
exports.checkName=(name)=>{
    const NameRegex = /^[a-zA-Z\u0600-\u06FF ]{2,30}$/;
    return !NameRegex.test(name)
}

// returns true if the email is invalid
exports.checkEmail=(email)=>{
    const EmailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return !EmailRegex.test(email)
}


// a valid phone number is a number that starts with 010, 011, 012 or 015 and has a length of 11 digits
// returns true if the phone number is invalid
exports.checkPhone= (phone) =>{
    const PhoneRegex = /^(010|011|012|015)[0-9]{8}$/;
    return !PhoneRegex.test(phone)
}

// a valid national id is a number that has a length of 14 digits
// returns true if the national id is invalid
exports.checkNationalId=(id)=>{
    const IdRegex = /^[0-9]{14}$/;
    return !IdRegex.test(id)
}

// return true if the image is invalid
exports.checkImg = async(img)=>{
    const ImgValidation = await  imageValidation(img,{ throw: false })
    return !ImgValidation

}

//return true if the website is invalid
exports.checkPSwebsites=(website)=>{
    const websites = ['CodeSignal','Codewars','Exercism','GeeksforGeeks','HackerRank','LeetCode','Project Euler','TopCoder']
    return !websites.includes(website)
}