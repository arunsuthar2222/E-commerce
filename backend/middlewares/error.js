const { JsonWebTokenError } = require("jsonwebtoken");
const ErrorHandler = require("../utils/errorHandler");

const errorMiddleware = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  /// Wrong mongodb id
  if (err.name === "CastError") {
    const message = `Resource not found, invalid: ${err.path}`;
    err = new ErrorHandler(message, 400);
  }

  /// Mongoose duplicate error
  if (err.code === 11000) {
    const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
    err = new ErrorHandler(message, 400);
  }

  /// Wrong JWT error
  if (err.name === "JsonWebTokenError") {
    const message = "Json Web Token is invalid, try again";
    err = new ErrorHandler(message, 400);
  }

  /// Jwt Expire
  if (err.name === "TokenExpireError") {
    const message = "Json Web Token is Expire, try again";
    err = new ErrorHandler(message, 400);
  }

  res.status(err.statusCode).json({ success: false, message: err.message });
};

module.exports = errorMiddleware;
