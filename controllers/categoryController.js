const knexConfig = require("../knexfile");
const knex = require("knex")(knexConfig);
const cloudinary = require('../configuration/cloudinaryConfig');
const { ResponseVO, PaginationResVO, ErrorVO } = require("../vo/responseVo");


class CategoryController {

    static async createCategory(req, res) {
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

            

            const existingUser = await knex("categories").where({ name: categoryData.categories }).first();
            if(existingUser){
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

    static async createSubcategory(req, res) {
        const subcategoryData = req.body;
      
        try {
            if (!subcategoryData.sub_category_name || !subcategoryData.categories_id) {
                const validationError = new ErrorVO(
                    400,
                    "BAD REQUEST",
                    "Missing required fields",
                    "Missing required fields"
                );
                return res.status(400).json(validationError);
            }

            const result = await knex("subcategories")
                .insert({ name: subcategoryData.sub_category_name, category_id: subcategoryData.categories_id })
                .returning(['id', 'name', 'category_id']);


            const successResponse = new ResponseVO(200, "Success", "Success", result);
            return res.status(200).json(successResponse);

        } catch (error) {
            const errorResponse = new ErrorVO(500, "Internal Server Error", "Internal Server Error", error.message);
            res.status(500).json(errorResponse);
        }
    }

    static async createType(req, res) {
        const typeData = req.body;
     
        try {
            if (!typeData.type_name || !typeData.sub_categories_id) {
                const validationError = new ErrorVO(
                    400,
                    "BAD REQUEST",
                    "Missing required fields",
                    "Missing required fields"
                );
                return res.status(400).json(validationError);
            }

            const result = await knex("types")
                .insert({ name: typeData.type_name, subcategory_id: typeData.sub_categories_id })
                .returning(['id', 'name', 'subcategory_id']);


            const successResponse = new ResponseVO(200, "Success", "Success", result);
            return res.status(200).json(successResponse);

        } catch (error) {
            const errorResponse = new ErrorVO(500, "Internal Server Error", "Internal Server Error", error.message);
            res.status(500).json(errorResponse);
        }
    }

    static async getCategories(req, res) {

        try {
            const result = await knex("categories")
                .select('id','name','category_image')
            const successResponse = new ResponseVO(200, "Success", "Success", result);
            return res.status(200).json(successResponse);

        } catch (error) {
            const errorResponse = new ErrorVO(500, "Internal Server Error", "Internal Server Error", error.message);
            res.status(500).json(errorResponse);
        }
    }


    static async getSubcategories(req, res) {
        const { categoryId } = req.query;

        try {
            if (!categoryId) {
                const validationError = new ErrorVO(
                    400,
                    "BAD REQUEST",
                    "Missing required fields",
                    "Missing required fields"
                );
                return res.status(400).json(validationError);
            }

            const result = await knex('subcategories')
                                .select('id','name','category_id')                    
                                .where({ category_id: categoryId });


            const successResponse = new ResponseVO(200, "Success", "Success", result);
            return res.status(200).json(successResponse);

        } catch (error) {
            const errorResponse = new ErrorVO(500, "Internal Server Error", "Internal Server Error", error.message);
            res.status(500).json(errorResponse);
        }
    }


    static async getTypes(req, res) {
        const { subcategoryId } = req.query;
      
      
        try {
            if (!subcategoryId) {
                const validationError = new ErrorVO(
                    400,
                    "BAD REQUEST",
                    "Missing required fields",
                    "Missing required fields"
                );
                return res.status(400).json(validationError);
            }

            const result = await knex("types")
                .select(['id', 'name', 'subcategory_id'])
                .where({subcategory_id: subcategoryId });
              
            const successResponse = new ResponseVO(200, "Success", "Success", result);
            return res.status(200).json(successResponse);

        } catch (error) {
            const errorResponse = new ErrorVO(500, "Internal Server Error", "Internal Server Error", error.message);
            res.status(500).json(errorResponse);
        }
    }





}

module.exports = CategoryController;