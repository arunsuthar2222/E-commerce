const express = require("express");
const app = express();
require("dotenv").config({ path: "config/config.env" });
const bodyParser = require("body-parser");
app.use(bodyParser.json());
const fileUplaod = require("express-fileupload");
const errorMiddleware = require("./middlewares/error");
const productRouter = require("./routes/productRoute");
const orederRouter = require("./routes/orderRoute");
const userRouter = require("./routes/userRoute");
const cors = require("cors");
const cookieParser = require("cookie-parser");
app.use(cookieParser());
app.use(express.json());
app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUplaod());

app.use("/api/product", productRouter);
app.use("/api/user", userRouter);
app.use("/api/order", orederRouter);

app.use(errorMiddleware);

module.exports = app;
