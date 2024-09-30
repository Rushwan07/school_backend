const dotenv = require("dotenv");
const catchAsync = require("../utils/catchAsync");
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const User = require("../models/userModel");
const AppError = require("../utils/appError");
dotenv.config();

exports.signup = catchAsync(async (req, res, next) => {
    const { email, name, password, number } = req.body;

    const user = await User.findOne({ email });
    if (user) {
        const error = new AppError("Email is already in use....", 400);
        return next(error);
    }

    const hashed = await bcryptjs.hash(password, 8);

    const newUser = await User.create({ email, name, password: hashed, number });
    const token = jwt.sign(
        { id: newUser._id, role: newUser.role, email: newUser.email },
        process.env.JWT_SECRECT,
        {
            expiresIn: process.env.LOGIN_EXPIRES,
        },
    );

    newUser.password = undefined;

    res.status(201).json({
        status: "success",

        data: {
            user: newUser,
        },
    });
});


exports.signin = catchAsync(async (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
  
    if (!email || !password) {
      const error = new AppError("Please enter mail id and password for login", 400);
      return next(error);
    }
  
    const user = await User.findOne({ email });
  
    if (!user) {
      const error = new AppError("User not found", 400);
      return next(error);
    }
  
    const match = await bcryptjs.compare(password, user.password);
  
    if (!match) {
      const error = new AppError("Please enter a correct email or password", 400);
      return next(error);
    }
    user.password = undefined;
    const token = jwt.sign(
      { id: user._id, role: user.role, email: user.email },
      process.env.JWT_SECRECT,
      {
        expiresIn: process.env.LOGIN_EXPIRES,
      },
    );
  
    res.status(201).json({
      status: "success",
  
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