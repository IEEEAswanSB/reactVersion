const CodeSormapplicant = require('../models/codestormapplicant.model')
const {checkName,checkEmail,checkPhone, checkPSwebsites} = require('../Helpers/Validators')

exports.sendcodestormuser = async (req, res) => {
    try{
    let rec = req.body
    if(checkName(rec.payload['name'])){
        res.status(422).json([{
            message: 'Enter a valid name!'
        }])
        return;
    }

    if(checkEmail(rec.payload['email'])){
        res.status(422).json([{
            message: 'Enter a valid email!'
        }])

        return;
    }

    if(checkPhone(rec.payload['phone'])){
        res.status(422).json([{
            message: 'Enter a valid phone!'
        }])     
        return;
    }

    if(checkPSwebsites(rec.payload['favHandler'])){
        res.status(422).json([{
            message: 'Enter a valid website!'
        }])
        return;
    }
    

    const applicant = new CodeSormapplicant({
        ...rec.payload
    })
    await applicant.save();
    res.status(201).json([{
        message: 'Registered successfully!'
    }]);  
    }catch(error){
        res.status(422).json([{
            message: 'Something went wrong!'
        }])
    }

}


  

