import dotenv from 'dotenv';

const nodemailer = require('nodemailer');

dotenv.load();
// console.log( process.env.GMAIL_USERNAME, process.env.PASS );
/**
 * This Module uses nodemailer transporter to send 
 * emails to users based on proirity
 * @param emails - Emails of Users in group
 * @param priority - Priority of message
 */
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USERNAME,
    pass: process.env.PASS,
  },
},
);
const emailOptions = {
  subject: 'New Message!',
  from: 'postitbydanny@gmail.com',
  html: `<div style="width: 100%; background-color: #f2f2f2; padding: 2%;">
  <div style="width: 60%; background-color: white; margin: auto;">
    <div style="height:40px; background-color: #43A047 ; width:100%">
      <center><h2 style="padding-top: 7px; color: #f2f2f2;">Post-it</h2>
      </center>
    </div>
    <div style="padding: 8%">
      <div class="row">
        <p>This email has been sent to you because you have a message
         on Post-iT</p>
        <p>Please follow this link to log in:<a style="background-color: 
        #43A047; padding: 10px;cursor: pointer; color: #f2f2f2;
         text-decoration: none;" 
        href="https://postitdanny.herokuapp.com/">Go to Post-it</a></p>
        <div style="border-top: 3px solid #43A047 ;"></div>
        <p style="font-weight: bold; color: #004d40 ">The PostIt Team</p>
      </div>
    </div>
  </div>
</div>`,
};
module.exports = (emails, priority) => {
  if (priority === 'Urgent' || priority === 'Critical') {
    emails.forEach((email) => {
      emailOptions.to = email;
      transporter.sendMail(emailOptions, (error, info) => {
        if (error) {
          return console.log(error);  // eslint-disable-line
        }
        console.log(info.response);  // eslint-disable-line
      });
    });
  }
};
