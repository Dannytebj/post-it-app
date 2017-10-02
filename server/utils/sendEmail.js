import dotenv from 'dotenv';

dotenv.load();
const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');

dotenv.load();
// console.log( process.env.GMAIL_USERNAME, process.env.PASS );
/**
 * This Module uses nodemailer transporter to send 
 * emails to users based on proirity
 * @param emails - Emails of Users in group
 * @param priority - Priority of message
 */
const transporter = nodemailer.createTransport(smtpTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.GMAIL_USERNAME,
    pass: process.env.PASS
  }
})
);
const emailOptions = {
  subject: 'New Message!',
  text: 'You have an Urgent message on PostiT',
  from: 'postitbydanny@gmail.com'
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
