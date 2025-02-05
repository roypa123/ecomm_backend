const UserModel = require("../models/userModel");
const { RequestVO } = require("../vo/requestVo");
const { ResponseVO, PaginationResVO, ErrorVO } = require("../vo/responseVo");
const helperFunction = require("../utils/helper_functions/helperfunctions");

class CategoryController {

    static async createCategories(req, res) {
        const categoryData = req.body;

        try {
            if (!categoryData.categories || !categoryData.sub_categories || !categoryData.types) {
                const validationError = new ErrorVO(
                    400,
                    "BAD REQUEST",
                    "Missing required fields",
                    "Missing required fields"
                );
                return res.status(400).json(validationError);
            }





        } catch (error) {
            const errorResponse = new ErrorVO(500, "Internal Server Error", "Internal Server Error", error.message);
            res.status(500).json(errorResponse);
        }
    }

}

module.exports = CategoryController;