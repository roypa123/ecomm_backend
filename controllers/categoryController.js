const knexConfig = require("../knexfile");
const knex = require("knex")(knexConfig);
const { RequestVO } = require("../vo/requestVo");
const { ResponseVO, PaginationResVO, ErrorVO } = require("../vo/responseVo");
const helperFunction = require("../utils/helper_functions/helperfunctions");

class CategoryController {

    static async createCategory(req, res) {
        const categoryData = req.body;
        const category_image = "sdsss"

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
        console.log(subcategoryData.categories_id)
        console.log(subcategoryData.sub_category_name)
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
        console.log(typeData.type_name)
        console.log(typeData.sub_categories_id)
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





}

module.exports = CategoryController;