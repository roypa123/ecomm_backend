const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('./cloudinaryConfig');

// Configure Multer storage with Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    return {
      folder: 'uploads', 
      allowed_formats: ['jpg', 'png', 'jpeg'], 
      transformation: [{ width: 500, height: 500, crop: 'limit' }], 
      public_id: `product_${Date.now()}_${Math.random().toString(36).substring(7)}`, // Unique ID
    };
  },
});


const upload = multer({ storage });

module.exports = upload;