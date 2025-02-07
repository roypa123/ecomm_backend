const express = require("express");
const upload = require('../configuration/multerConfig')
const categoryController = require("../controllers/categoryController");
const helperFunction = require("../utils/helper_functions/helperfunctions");
const router = express.Router();

router.post("/category",helperFunction.isAdmin,upload.single('image'), categoryController.createCategory);
router.post("/subcategory", helperFunction.isAdmin,categoryController.createSubcategory);
router.post("/type", helperFunction.isAdmin,categoryController.createType);
router.get("/categories", categoryController.getCategories);
router.get("/subcategories", categoryController.getSubcategories);
router.get('/types', categoryController.getTypes);



module.exports = router;