const UserModel = require("../models/userModel");

const { RequestVO } = require("../vo/requestVo");
const { ResponseVO, PaginationResVO, ErrorVO } = require("../vo/responseVo");
const helperFunction = require("../utils/helper_functions/helperfunctions");
const transporter = require("../configuration/mailerconfig");

class UserController {
  static async createUser(req, res) {
    const userData = req.body;


    try {
      if (
        !userData.email ||
        !userData.name ||
        !userData.password ||
        !userData.role
      ) {
        const validationError = new ErrorVO(
          400,
          "BAD REQUEST",
          "Missing required fields"
        );
        return res.status(400).json(validationError);
      }

      const isValidEmail = await helperFunction.isValidEmail(userData.email);

      if (!isValidEmail) {
        const validationError = new ErrorVO(
          400,
          "BAD REQUEST",
          "Invalid email"
        );
        return res.status(400).json(validationError);
      }

      const isValidPassword = await helperFunction.isValidPassword(
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
      console.log("tinu")
      const result = await UserModel.createUser(requestVO.data);
      console.log("tinu1")
      console.log(result.user_id2.toString())


      const mailOptions = {
        from: "roypa81130@gmail.com",
        to: result.email,
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
                <h1>Create account for Mobikul App</h1>
                <p>Hello,</p>
                <p>We have received a request for OTP for creating account in Mobikul App. To proceed with the creating account, please use the following code:</p>
               
                <p>If you didn't request a OTP for creating account, you can safely ignore this email.</p>
                <p>Thank you!</p>
            </div>
        </body>
        </html>
    `,
      };

      // <p class="token">${requesttoken}</p>

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
            "Otp sent successfully"
          );
          res.status(200).json(successResponse);
        }
      });


      // const successResponse = new ResponseVO("Success", 201, result);
      // res.status(201).json(successResponse);
    } catch (error) {
      const errorResponse = new ResponseVO("Internal Server Error", 500, error);
      res.status(500).json(errorResponse);
    }
  }

  ///-----------------

  static async login(req, res) {
    const userData = req.body;

    try {
      if (!userData.email || !userData.password) {
        const validationError = new ErrorVO(
          400,
          "BAD REQUEST",
          "Missing required fields"
        );
        return res.status(400).json(validationError);
      }

      const isValidEmail = await helperFunction.isValidEmail(userData.email);

      if (!isValidEmail) {
        const validationError = new ErrorVO(
          400,
          "BAD REQUEST",
          "Invalid email"
        );
        return res.status(400).json(validationError);
      }

      const isValidPassword = await helperFunction.isValidPassword(
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
      const successResponse = new ResponseVO("Success", 200, result);
      res.status(200).json(successResponse);

    } catch (error) {
      const errorResponse = new ResponseVO("Internal Server Error", 500, error);
      res.status(500).json(errorResponse);
    }
  }




}

module.exports = UserController;