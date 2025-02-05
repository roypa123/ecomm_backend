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

}

module.exports = CategoryController;