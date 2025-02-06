const express = require("express");
const upload = require('../configuration/multerConfig')
const productController = require("../controllers/productController");

const router = express.Router();

router.post("/create_product",upload.single('images',4), productController.createProduct);




module.exports = router;