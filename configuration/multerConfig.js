const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('./cloudinaryConfig');

// Configure Multer storage with Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  // params: {
  //   folder: 'uploads', // Cloudinary folder name
  //   allowed_formats: ['jpg', 'png', 'jpeg'], // Allowed file formats
  //   transformation: [{ width: 500, height: 500, crop: 'limit' }] // Optional transformations
  // }
  params: async (req, file) => {
    return {
      folder: 'uploads', // Cloudinary folder name
      allowed_formats: ['jpg', 'png', 'jpeg'], // Allowed file formats
      transformation: [{ width: 500, height: 500, crop: 'limit' }], // Optional transformations
      public_id: `product_${Date.now()}_${Math.random().toString(36).substring(7)}`, // Unique ID
    };
  },
});

// Initialize Multer with Cloudinary storage
const upload = multer({ storage });

module.exports = upload;