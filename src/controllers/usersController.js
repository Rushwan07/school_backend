const dotenv = require("dotenv");
const catchAsync = require("../utils/catchAsync");
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const User = require("../models/userModel");
const AppError = require("../utils/appError");

dotenv.config();

exports.signup = catchAsync(async (req, res, next) => {
  const { email, name, password, contactNumber, role, address, regNo } = req.body;


  const user = await User.findOne({ email });
  if (user) {
    return next(new AppError("Email is already in use.", 400));
  }


  const hashedPassword = await bcryptjs.hash(password, 8);


  const newUser = await User.create({
    email,
    name,
    password: hashedPassword,
    contactNumber,
    role,
    address,
    regNo
  });


  const token = jwt.sign(
    { id: newUser._id, role: newUser.role, email: newUser.email },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.LOGIN_EXPIRES,
    },
  );

  newUser.password = undefined;

  res.status(201).json({
    status: "success",
    token,
    data: {
      user: newUser,
    },
  });
});


exports.signin = catchAsync(async (req, res, next) => {
  const { email, password, regNo } = req.body;

  if (!email && !regNo || !password) {
    return next(new AppError("Please enter email or registration number, and password for login.", 400));
  }

  // Find user by email or regNo
  const user = await User.findOne({
    $or: [{ email }, { regNo }]
  });

  if (!user) {
    return next(new AppError("User not found.", 404));
  }

  const match = await bcryptjs.compare(password, user.password);

  if (!match) {
    return next(new AppError("Incorrect email/registration number or password.", 400));
  }

  user.password = undefined; // Remove password from user object
  const token = jwt.sign(
    { id: user._id, role: user.role, email: user.email },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.LOGIN_EXPIRES,
    },
  );

  res.status(200).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
});

exports.signout = catchAsync(async (req, res, next) => {

  res.clearCookie("token");

  res.status(200).json({
    status: "success",
    message: "User successfully signed out.",
  });
});
