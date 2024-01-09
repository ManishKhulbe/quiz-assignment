
const nodemailer = require("nodemailer");
const Promise = require('bluebird');
var ejs = require('ejs');

function _templateRead(template,param){
   let filename = "./views/" + template + '.ejs';
   return new Promise(function (resolve, reject) {
    ejs.renderFile( filename, param,
      function (err, htmlData) {
        if(err){
            reject(err)
        }
      if(htmlData){
          resolve(htmlData)
          return htmlData;
      }
    })
    });
}


// function _templateRead(template, params) {
//   let filename = "./lib/emailTemplate/" + template + '.ejs';
//   return new Promise(function (resolve, reject) {
//     ejs.renderFile(filename, params, function (error, htmlData) {
//       if (error) {
//         reject(error);
//       } 
//         var msgs2 = JSON.stringify(htmlData);
//         console.log(msgs2);   
    //   resolve(htmlData);
//     return htmlData
//     });
//   });
// }

async function sendEmail(payload){

	var fromEmail = process.env.SENDGRID_FROM_EMAIL;
    
	var toEmail = payload.to;
	var subject = payload.subject;
    var content = await _templateRead(payload.template , payload.content)
        let smtpTransport = nodemailer.createTransport({
            // host: config.cfg.smtp.host,
            port: 587,
            service: 'gmail',
            secure: false, // true for 465, false for other ports
            auth: {
                user: fromEmail,
                pass: process.env.SENDGRID_KEY,
            }
        });
        // setup email data with unicode symbols
        let mailOptions = {
            from: fromEmail, // sender address.  Must be the same as authenticated user if using Gmail.
            to: toEmail, // receiver
            subject: subject, // subject
            html: content // html body
            
        };
        return new Promise( function ( resolve , reject ) {
            smtpTransport.sendMail(mailOptions, function(err, data){
                    if( err){
                            return reject( err )
                            }
                    resolve( data );
                })
        })

}

// ========================== Export Module Start ==========================
module.exports = {
	sendEmail
}
// ========================== Export Module End ============================