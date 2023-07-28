const User = require("../models/userModel.js");
const catchAsyncError = require("../middleware/catchAsyncError.js");
const ErrorHandler = require("../utils/errorHandler.js");
const { sendToken } = require("../utils/jwtToken.js");
const { sendEmail } = require("../utils/sendEmail.js");
const crypto = require("crypto");

//register user
const createUser = catchAsyncError(async (req, res, next) => {
  const { name, email, password } = req.body;

  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: "this is avatar",
      url: "this is url",
    },
  });
  res.redirect('/products')
  sendToken(user, 201, res);
});

const register = async (req,res) =>{
  res.render('register')
}

const admin = async (req,res) =>{
  res.render('admin')
}

//login user
const loginUser = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;
// console.log(req.body);
  //checking if user has given password and email
  if (!email || !password) {
    return next(new ErrorHandler("Please enter name or password", 400));
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }
  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }
  // res.redirect('/products')
    // res.redirect('/products')
  sendToken(user, 200, res);
//  console.log(response)

});

const login = async (req,res) =>{
  res.render('login')
}

//logout user
const logoutUser = catchAsyncError(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged Out",
  });
});

//forget password (token genration)
const forgetPassword = catchAsyncError(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new ErrorHandler("User not found", 401));
  }

  //get ResetPasswords Token
  const resetToken = user.getResetPasswordToken();
  await user.save({ validateBeforSave: false });

  const resetPasswordUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/reset/${resetToken}`;

  const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\n if you have not requested this email then please ignore it`;

  try {
    await sendEmail({
      email: user.email,
      subject: "Password Reset Token",
      message: message,
    });

    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email} successfully `,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforSave: false });

    return next(new ErrorHandler(error, message, 500));
  }
});

// reset password
const resetPassword = catchAsyncError(async (req, res, next) => {
  //creating token hash

  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });
  if (!user) {
    return next(
      new ErrorHandler(
        "Reset password token is invalid or has been expired ",
        400
      )
    );
  }
  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandler("Password does not matched", 400));
  }
  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();
  sendToken(user, 200, res);
});

const getUserDetail = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    user,
  });
});

// update user password
const updateUserPassword = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");

  const isPasswordMatched = await user.comparePassword(req.body.oldPassword);
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Old Password is incoorect ", 401));
  }
  if (req.body.newPassword !== req.body.confirmPassword) {
    return next(new ErrorHandler("Password does not matched", 400));
  }

  user.password = req.body.newPassword;

  await user.save();
  sendToken(user, 200, res);
});

// update user Profile
const updateUserpPofile = catchAsyncError(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
  };

  const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  if (!user) {
    next(new ErrorHandler("user not found", 400));
  }

  res.status(200).json({
    success: true,
  });
});
//get all users admin
const getAllUsers = catchAsyncError(async (req, res, next) => {
 const users = await User.find()

  res.status(200).json({
    success: true,
    users
  });
});

// get single user detail --Admin
const getSingleUserDetail = catchAsyncError(async (req, res, next) => {
 const user = await User.find({_id:req.params.id})
   if(!user){
    next(new ErrorHandler("User does not exist with id "+req.params.id))
   }
  res.status(200).json({
    success: true,
    user
  });
});

//update user role --admin
const updateUserbyAdmin= catchAsyncError(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
    role:req.body.role
  };

  const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  if (!user) {
    next(new ErrorHandler("user not found", 400));
  }

  res.status(200).json({
    success: true,
  });
});

//delete user by admin
const deleteUserByAdmin =  catchAsyncError (async(req ,res, next)=>{
  console.log(req.params)
      const user = await User.findById(req.params.id)
      if(!user){
        next(new ErrorHandler("User does not exist with id "+req.params.id))
      }
   
        await user.remove()
     
   
      // await user.findByIdAndDelete(req.params.id)
      res.status(200).json({
        success: true,
        message:"User Deleted successfully"
      })
})

module.exports = {
  createUser,
  register,
  loginUser,
  login,
  admin,
  logoutUser,
  forgetPassword,
  resetPassword,
  getUserDetail,
  updateUserPassword,
  updateUserpPofile,
  getAllUsers,
  getSingleUserDetail,
  updateUserbyAdmin,
  deleteUserByAdmin
};
