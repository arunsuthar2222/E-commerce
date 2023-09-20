const jwt = require("jsonwebtoken");
const catchAsyncError = require("./catchAsyncError");
const ErrorHandler = require("../utils/errorHandler");
const User = require("../models/User");

const isAuthenticatedUser = catchAsyncError(async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return next(new ErrorHandler("User is Unauthenticated", 401));
  }

  const payload = jwt.verify(token, process.env.JWT_SECERET);
  const user = await User.findById(payload.user.id);
  if (!user) {
    return next(new ErrorHandler("Please Login User first", 401));
  }
  req.user = user;
  next();
});

authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `Role: ${req.user.role} is not allowed to access this resource`,
          403
        )
      );
    }
    next();
  };
};

module.exports = { isAuthenticatedUser, authorizeRoles };
