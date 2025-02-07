const express = require("express");
const http = require("http");

const app = express();
const server = http.createServer(app);
const config = require('./configuration/config');

const port = config.port;
const swaggerUi = require("swagger-ui-express");
const specs = require("./configuration/swaggerConfig");

app.use(express.json());
const { ErrorVO } = require("./vo/responseVo");
const constants = require('./utils/constants')

const userRoutes = require("./routes/userRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const productRoutes = require("./routes/productRoutes");

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  //res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

const authenticateUser = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1]; // Expect "Bearer <token>"
  if (!token) {

    const validationError = new ErrorVO(
      400,
      "Access denied",
      "Access denied. No token provided.",
      "Access denied. No token provided."
    );
    return res.status(400).json(validationError);

  }

  console.log("manu");
  // console.log(token);
  console.log(constants.ACCESS_TOKEN_SECRET)

  try {
    const decoded = jwt.verify(token, constants.ACCESS_TOKEN_SECRET);
    req.user = decoded; // Attach user details to request
    next();
  } catch (err) {
    const validationError = new ErrorVO(
      400,
      "Failure",
      "Invalid token",
      "Invalid token"
    );
    return res.status(400).json(validationError);
  }
};

app.use("/mobikul/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

app.use("/mobikul/users", userRoutes);
app.use("/mobikul/categories", authenticateUser, categoryRoutes);
app.use("/mobikul/products", authenticateUser, productRoutes);

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});