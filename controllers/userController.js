const UserModel = require("../models/userModel");

const { RequestVO } = require("../vo/requestVo");
const { ResponseVO, PaginationResVO, ErrorVO } = require("../vo/responseVo");
const HelperFunction = require("../utils/helper_functions/helperfunctions");
const transporter = require("../configuration/mailerconfig");

class UserController {
  static async createUser(req, res) {
    const userData = req.body;
    console.log("manu");

    try {
      if (
        !userData.email ||
        !userData.name ||
        !userData.password
      ) {
        const validationError = new ErrorVO(
          400,
          "BAD REQUEST",
          "Missing required fields"
        );
        return res.status(400).json(validationError);
      }

      const isValidEmail = await HelperFunction.isValidEmail(userData.email);

      if (!isValidEmail) {
        const validationError = new ErrorVO(
          400,
          "BAD REQUEST",
          "Invalid email"
        );
        return res.status(400).json(validationError);
      }

      const isValidPassword = await HelperFunction.isValidPassword(
        userData.password
      );

      if (!isValidPassword) {
        const validationError = new ErrorVO(
          400,
          "BAD REQUEST",
          "Invalid password"
        );
        return res.status(400).json(validationError);
      }

      console.log("manu1");

      const userExists = await UserModel.userExists(userData.email);
      if (userExists) {
        const conflictError = new ErrorVO(
          409,
          "BAD REQUEST",
          "User already exists"
        );
        return res.status(409).json(conflictError);
      }

      

      const requestVO = new RequestVO({
        data: userData,
        pagination: null,
        filter: null,
        sortBy: null,
      });

      const result = await UserModel.createUser(requestVO.data);

      const successResponse = new ResponseVO("Success", 201, result);
      res.status(201).json(successResponse);
    } catch (error) {
      const errorResponse = new ResponseVO("Internal Server Error", 500, error);
      res.status(500).json(errorResponse);
    }
  }

  ///-----------------

  static async login(req, res) {
    const userData = req.body;

    try {
      if (!userData.email || !userData.password || !userData.role) {
        const validationError = new ErrorVO(
          400,
          "BAD REQUEST",
          "Missing required fields"
        );
        return res.status(400).json(validationError);
      }

      const isValidEmail = await HelperFunction.isValidEmail(userData.email);

      if (!isValidEmail) {
        const validationError = new ErrorVO(
          400,
          "BAD REQUEST",
          "Invalid email"
        );
        return res.status(400).json(validationError);
      }

      const isValidPassword = await HelperFunction.isValidPassword(
        userData.password
      );

      if (!isValidPassword) {
        const validationError = new ErrorVO(
          400,
          "BAD REQUEST",
          "Invalid password"
        );
        return res.status(400).json(validationError);
      }

      const userExists = await UserModel.userExists(userData.email);

      if (!userExists) {
        const conflictError = new ErrorVO(
          409,
          "Invalid email and password",
          "Invalid email and password"
        );
        return res.status(409).json(conflictError);
      }

      const requestVO = new RequestVO({
        data: userData,
        pagination: null,
        filter: null,
        sortBy: null,
      });

      const result = await UserModel.loginUser(requestVO.data);
      if (result == null) {
        const errorResponse = new ErrorVO(
          500,
          "Invalid email and password",
          "Invalid email and password"
        );
        res.status(500).json(errorResponse);
      } else {
        const successResponse = new ResponseVO("Success", 200, result);
        res.status(200).json(successResponse);
      }
    } catch (error) {
      const errorResponse = new ResponseVO("Internal Server Error", 500, error);
      res.status(500).json(errorResponse);
    }
  }

  static async forgotPassword(req, res) {
    const { email } = req.body;

    try {
      if (!email) {
        const validationError = new ErrorVO(
          400,
          "BAD REQUEST",
          "Missing required fields"
        );
        return res.status(400).json(validationError);
      }

      const isValidEmail = await HelperFunction.isValidEmail(email);

      if (!isValidEmail) {
        const validationError = new ErrorVO(
          400,
          "BAD REQUEST",
          "Invalid email"
        );
        return res.status(400).json(validationError);
      }

      const result1 = await UserModel.fetchingUserDataForPasswordRequest(email);

      const userId = result1.user_id;

      if (!result1) {
        const errorResponse = new ErrorVO(
          500,
          "Invalid email",
          "Invalid email"
        );
        res.status(500).json(errorResponse);
      }

      const requesttoken = await HelperFunction.generateImagesNames();

      const currentTime = Date.now();

      const futureTime = currentTime + 5 * 60 * 1000;

      const result2 = await UserModel.sendingDataToRequestTokenTable(
        userId,
        requesttoken,
        futureTime
      );

      if (!result2) {
        const errorResponse = new ErrorVO(
          500,
          "Some error occured",
          "Some error occured"
        );
        res.status(500).json(errorResponse);
      }

      const mailOptions = {
        from: "roypa81130@gmail.com",
        to: email,
        subject: "Password Reset",
        html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Password Reset</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    line-height: 1.6;
                    color: #333;
                    background-color: #f4f4f4;
                    margin: 0;
                    padding: 0;
                }
                .container {
                    max-width: 600px;
                    margin: 20px auto;
                    padding: 20px;
                    background-color: #fff;
                    border-radius: 8px;
                    box-shadow: 0 0 10px rgba(0,0,0,0.1);
                }
                h1 {
                    color: #007bff;
                }
                p {
                    margin-bottom: 20px;
                }
                .token {
                    font-weight: bold;
                    color: #007bff;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>Password Reset for Quotely App</h1>
                <p>Hello,</p>
                <p>We have received a request to reset your password for Quotely App. To proceed with the password reset, please use the following code:</p>
                <p class="token">${requesttoken}</p>
                <p>If you didn't request a password reset, you can safely ignore this email.</p>
                <p>Thank you!</p>
            </div>
        </body>
        </html>
    `,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          const errorResponse = new ErrorVO(
            500,
            "Invalid email and password",
            "Invalid email and password"
          );
          res.status(500).json(errorResponse);
        } else {
          const successResponse = new ResponseVO(
            "Success",
            200,
            "Reset email sent successfully"
          );
          res.status(200).json(successResponse);
        }
      });
    } catch (error) {
      const errorResponse = new ResponseVO("Internal Server Error", 500, error);
      res.status(500).json(errorResponse);
    }
  }

  static async sendResetToken(req, res) {
    const userData = req.body;

    console.log(userData.token);

    try {
      if (!userData.token) {
        const validationError = new ErrorVO(
          400,
          "BAD REQUEST",
          "Missing required fields"
        );
        return res.status(400).json(validationError);
      }

      if (!(userData.token.length == 10)) {
        const validationError = new ErrorVO(
          400,
          "BAD REQUEST",
          "Inavalid token"
        );
        return res.status(400).json(validationError);
      }

      const tokenExists = await UserModel.tokenExists(userData);

      if (!tokenExists) {
        const conflictError = new ErrorVO(
          409,
          "Invalid email and password",
          "Invalid email and password"
        );
        return res.status(409).json(conflictError);
      }
      console.log(tokenExists);
      const currentTime = Date.now();
      const exirytime = tokenExists.expiry_at;

      console.log(exirytime);

      if (exirytime > currentTime) {
        const successResponse = new ResponseVO("Success", 200, tokenExists);
        res.status(200).json(successResponse);
      } else {
        const conflictError = new ErrorVO(
          409,
          "Token expired",
          "Token expired"
        );
        return res.status(409).json(conflictError);
      }
    } catch (error) {
      const errorResponse = new ResponseVO("Internal Server Error", 500, error);
      res.status(500).json(errorResponse);
    }
  }

  static async tokenChangePassword(req, res) {
    const userData = req.body;

    console.log(userData.token);

    try {
      if (
        !userData.id ||
        !userData.user_id ||
        !userData.token ||
        !userData.apikey ||
        !userData.password
      ) {
        const validationError = new ErrorVO(
          400,
          "BAD REQUEST",
          "Missing required fields"
        );
        return res.status(400).json(validationError);
      }

      const isValidPassword = await HelperFunction.isValidPassword(
        userData.password
      );

      if (!isValidPassword) {
        const validationError = new ErrorVO(
          400,
          "BAD REQUEST",
          "Invalid password"
        );
        return res.status(400).json(validationError);
      }

      const passwordchanged = await UserModel.tokenChangePassword(userData);
      if (passwordchanged == 1) {
        const successResponse = new ResponseVO(
          "Success",
          200,
          "Password changed successfully"
        );
        res.status(200).json(successResponse);
      } else {
        const validationError = new ErrorVO(
          400,
          "BAD REQUEST",
          "Some error occured"
        );
        return res.status(400).json(validationError);
      }
    } catch (error) {
      const errorResponse = new ResponseVO("Internal Server Error", 500, error);
      res.status(500).json(errorResponse);
    }
  }
}

module.exports = UserController;