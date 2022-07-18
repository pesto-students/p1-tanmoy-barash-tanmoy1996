import nodemailer from 'nodemailer';

var transporter = nodemailer.createTransport({
  service: "hotmail",
  auth: {
    user: "barash.tanmoy@hotmail.com",
    pass: "!tanmoy098!"
  }
});

export {transporter}