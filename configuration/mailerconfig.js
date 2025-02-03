const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'Gmail',
//   service: 'gmail', // Use 'gmail' for Gmail
//   host: 'smtp.gmail.com',
//   port: 587, // Replace with your email provider's port (might be different)
  secure: false, // Your email service provider
  auth: {
    user: 'roypa81130@gmail.com', // Your email address
    pass: 'wmou xtik bcym ouou' // Your email password
  }
});

module.exports = transporter;