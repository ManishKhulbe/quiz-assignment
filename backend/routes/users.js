const express = require('express');
const router = express.Router();
const middleware = require('../middleware/index')
const {signUp , logIn , logOut} = require('../controller/userController')

/* GET users listing. */

// SignUp Router

router.post('/signUp', middleware.validator.validateSignup ,function(req, res, next) {
  signUp(req.body).then((result)=>{
    res.send(result);
  })
  .catch((err)=>{
    res.send({
      "Message" : "Email Already Exists",
      "Error message " : err})
  })

});

//Login Router

router.post('/logIn', middleware.validator.validateLogIn ,function(req, res, next) {
 
  logIn(req.body).then((result)=>{
    console.log(result)
    res.send(result);
  })
  .catch((err)=>{
    res.send({
      "Message" : "Invalid Email and password",
      "Error message " : err})
  })

});

//User LogOut

router.post('/logOut', middleware.authenticate.verifyUsrToken ,function(req, res, next) {
  logOut(req.payload).then((result)=>{
    res.send({
      "Response Message" : "Successfully Logout "
    });
  })
  .catch((err)=>{
    res.send({
      "Error message " : err})
  })
});




module.exports = router;
