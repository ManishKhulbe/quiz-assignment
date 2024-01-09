"use strict";

const User = require('../model/userModel');

//========================== Load Modules End ==============================================

async function signUp(userInfo) {
    let user = new User(userInfo);
   const res = await user.save();
      return res;      
}

 function logIn(userEmail) {
    let user =  User.findOne({"email" : userEmail})
    return user;      
}


function logOut(userEmail) {
    // let user =  User.findOne({"email" : userEmail})
    // return user;      
}

//========================== Export Module Start ==============================

module.exports = {
    signUp,
    logIn
};

//========================== Export Module End ===============================
