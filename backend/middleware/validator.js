//========================== Load Modules Start ===========================

//========================== Load external Module =========================
const _ = require("lodash");

//========================== Load Internal Module =========================
var appUtils = require("../service/appUtils");

//========================== Load Modules End =============================



//========================== Export Module Start ===========================


var validateSignup = function (req, res, next) {

    var { UserName , email , password  } = req.body;
    console.log("🚀 ~ file: validator.js:19 ~ validateSignup ~ UserName , email , password :", UserName , email , password )
    var {  } = req.headers;
    var errors = [];
    if (_.isEmpty(UserName)) {
        errors.push({ fieldName: "UserName", message: "UserName Can not be empty" });
    }
    // if ( !_.isNaN(UserName)) {
    //     errors.push({ fieldName: "UserName", message: "UserName Can not be a Number" });
    // }
    if (_.isEmpty(email)) {
        errors.push({ fieldName: "email", message: "Please fill your email" });
    }
    if (_.isEmpty(password)) {
        errors.push({ fieldName: "password", message: "Password Can not be empty" });
    }
    else if(!appUtils.isValidEmail(email)){
        errors.push({ fieldName: "email", message: "Email is not valid "});
    }

    if (errors && errors.length > 0) {
        res.send({
            "Validation Error" : errors
        })
    }

    next();
}



var validateLogIn = function (req, res, next) {

    var {  email , password  } = req.body;
    var {  } = req.headers;
    var errors = [];
    if (_.isEmpty(email)) {
        errors.push({ fieldName: "email", message: "Please fill your email" });
    }
    if (_.isEmpty(password)) {
        errors.push({ fieldName: "password", message: "Password Can not be empty" });
    }
    if (errors && errors.length > 0) {
        res.send({
            "Validation Error" : errors
        })
    }

    next();
}

module.exports = {
    validateSignup,
    validateLogIn
};
//========================== Export module end ==================================
