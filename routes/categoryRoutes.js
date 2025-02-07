const express = require("express");
const upload = require('../configuration/multerConfig')
const categoryController = require("../controllers/categoryController");
const helperFunction = require("../utils/helper_functions/helperfunctions");

const router = express.Router();

router.post("/category",upload.single('image'), categoryController.createCategory);
router.post("/subcategory", categoryController.createSubcategory);
router.post("/type", categoryController.createType);
router.get("/categories", helperFunction.isAdmin, categoryController.getCategories);
router.get("/subcategories", categoryController.getSubcategories);
router.get('/types', categoryController.getTypes);



module.exports = router;