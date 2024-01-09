//========================== Load External Module =========================

const bcrypt = require('bcrypt');

//========================== Export Module Start ===========================


const encryptHashPassword = function (password, salt) {
    return bcrypt.hashSync(password, salt);
}

function isValidEmail(email) {
    var pattern = /(([a-zA-Z0-9\-?\.?]+)@(([a-zA-Z0-9\-_]+\.)+)([a-z]{2,3}))+$/;
    return new RegExp(pattern).test(email);
}

async function verifyEncyptedPassword(responsePassword , origionalPassword ){
   
    let result =  await bcrypt.compare(responsePassword , origionalPassword)
         console.log(result)
         return result
 }


module.exports = {
    encryptHashPassword ,
    isValidEmail,
    verifyEncyptedPassword
};