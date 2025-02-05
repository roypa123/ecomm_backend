const express = require("express");
const categoryController = require("../controllers/categoryController");

const router = express.Router();

router.post("/category", categoryController.createCategory);
router.post("/subcategory", categoryController.createSubcategory);
router.post("/type", categoryController.createType);
// router.get("/categories", categoryController.getSubcategories);
// router.get("/subcategories/:categoryId", categoryController.getSubcategories);
// router.get('/types/:subcategoryId', categoryController.getTypes);



module.exports = router;