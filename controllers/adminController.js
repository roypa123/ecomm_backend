const UserModel = require("../models/userModel");
const { RequestVO } = require("../vo/requestVo");
const { ResponseVO, PaginationResVO, ErrorVO } = require("../vo/responseVo");
const helperFunction = require("../utils/helper_functions/helperfunctions");

class AdminController {

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




            const userExists = await UserModel.userExists(userData.email);

            if (!userExists) {
                const conflictError = new ErrorVO(
                    409,
                    "Invalid email and password",
                    "Invalid email and password",
                    "Invalid email and password"
                );
                return res.status(409).json(conflictError);
            }

            const isStatus = await UserModel.userStatus(userData.email);

            console.log(isStatus.status);
            if (isStatus.status == 0) {

                const result = {
                    "redirectTo": "create_aacount_otp_section",
                    "email": userData.email
                }
                const successResponse = new ResponseVO(200, "Success", "Success", result);
                return res.status(200).json(successResponse);

            }

            const requestVO = new RequestVO({
                data: userData,
                pagination: null,
                filter: null,
                sortBy: null,
            });

            const result = await UserModel.loginUser(requestVO.data);
            const successResponse = new ResponseVO(200, "Success", "Success", result);
            res.status(200).json(successResponse);

        } catch (error) {
            const errorResponse = new ErrorVO(500, "Internal Server Error", "Internal Server Error", error.message);
            res.status(500).json(errorResponse);
        }
    }

}

module.exports = AdminController;