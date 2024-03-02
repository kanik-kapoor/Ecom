const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("./catchAsyncError");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const isAuthenticatedUser = catchAsyncError(async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    //  return next(new ErrorHandler("Please login to access this resource",401))
    res.redirect(
      "/error?statusCode=401&message=Please login to access this resource"
    );
  }
  const decodedData = jwt.verify(token, process.env.JWT_SECRET);

  req.user = await User.findById(decodedData.id);
  //  console.log(' i am authenticated')
  next();
});

const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      //  return next ( new ErrorHandler(`Role: ${req.user.role} is not allowed to access this resource`, 403))
      res.redirect(
        "/error?statusCode=403&message=You are not allowed to access this resource"
      );
    }
    // console.log("i am authorized")
    next();
  };
};

module.exports = {
  isAuthenticatedUser,
  authorizeRoles,
};
