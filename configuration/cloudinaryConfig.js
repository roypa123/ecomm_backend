const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: "do3m0gpie",
  api_key: "119579852163761",
  api_secret: "JDcRS9Po8uIE6-p5YHoRxnW5dcU"
});

module.exports = cloudinary;

//CLOUDINARY_URL=cloudinary://<your_api_key>:<your_api_secret>@do3m0gpie