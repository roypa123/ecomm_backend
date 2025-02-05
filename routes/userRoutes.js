const express = require("express");
const UserController = require("../controllers/userController");

const router = express.Router();

router.post("/create", UserController.createUser);

router.post("/login", UserController.login);

router.post("/create_account_otp", UserController.createAccountOtp);

module.exports = router;
