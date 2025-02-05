const express = require("express");
const http = require("http");

const app = express();
const server = http.createServer(app);
const config = require('./configuration/config');

const port = config.port ;
const swaggerUi = require("swagger-ui-express");
const specs = require("./configuration/swaggerConfig");

app.use(express.json());

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
  next();
};

app.use("/mobikul/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

app.use("/mobikul/users", userRoutes);
app.use("/mobikul/categories", categoryRoutes);
app.use("/mobikul/products", productRoutes);

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});