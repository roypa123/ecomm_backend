const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true, 
  auth: {
    user: 'roypa81130@gmail.com', 
    pass: 'nxyk cpwz nuto ikoi' 
  }
});

module.exports = transporter;