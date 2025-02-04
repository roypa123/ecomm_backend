const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  secure: false, 
  auth: {
    user: 'roypa81130@gmail.com', 
    pass: 'wmou xtik bcym ouou' 
  }
});

module.exports = transporter;