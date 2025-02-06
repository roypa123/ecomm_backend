const knexConfig = require("../knexfile");
const knex = require("knex")(knexConfig);
// const { RequestVO } = require("../vo/requestVo");
const cloudinary = require('../configuration/cloudinaryConfig');
const { ResponseVO, PaginationResVO, ErrorVO } = require("../vo/responseVo");
// const helperFunction = require("../utils/helper_functions/helperfunctions");

class ProductController {

    static async createProduct(req, res) {
        const categoryData = req.body;


        try {
            if (!categoryData.categories) {
                const validationError = new ErrorVO(
                    400,
                    "BAD REQUEST",
                    "Missing required fields",
                    "Missing required fields"
                );
                return res.status(400).json(validationError);
            }

            console.log("hi")

            const existingUser = await knex("categories").where({ name: categoryData.categories }).first();
            if (existingUser) {
                const validationError = new ErrorVO(
                    400,
                    "BAD REQUEST",
                    "Category already exists",
                    "Category already exists"
                );
                return res.status(400).json(validationError);

            }



            let category_image = null;
            if (req.file) {
                const uploadedImage = await cloudinary.uploader.upload(req.file.path, {
                    folder: "categories", // Folder name in Cloudinary
                    use_filename: true,
                    unique_filename: false,
                });
                category_image = uploadedImage.secure_url; // Get Cloudinary URL
            }
            console.log(category_image);


            const result = await knex("categories")
                .insert({ name: categoryData.categories, category_image: category_image })
                .returning(['id', 'name', 'category_image']);


            const successResponse = new ResponseVO(200, "Success", "Success", result);
            return res.status(200).json(successResponse);

        } catch (error) {
            const errorResponse = new ErrorVO(500, "Internal Server Error", "Internal Server Error", error.message);
            res.status(500).json(errorResponse);
        }
    }






}

module.exports = ProductController;