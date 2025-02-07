const express = require("express");
const upload = require('../configuration/multerConfig')
const productController = require("../controllers/productController");
const helperFunction = require("../utils/helper_functions/helperfunctions");
const router = express.Router();

router.post("/create_product",helperFunction.isAdmin,upload.array('images',3), productController.createProduct);
router.get("/products_sub_cat/:subcategory_id", productController.getProductsBySubcategory);
router.post("/add_review", productController.addReview);
router.get("/product_detail/:productid", productController.getProductDetail);

module.exports = router;