const jwt = require("jsonwebtoken");
const catchAsync = require("./catchAsync");

const Admin = require("../models/AdminModel");
const Teacher = require("../models/TeacherModel");
const Student = require("../models/StudentModel");

exports.verifyToken = catchAsync(async (req, res, next) => {
    console.log("Cookies: ", req.cookies);

    const testToken = req.cookies.token;

    if (!testToken || !testToken.startsWith("bearer")) {
        return res.status(400).json({
            status: "failed",
            message: "You are not logged in",
        });
    }

    let token = testToken.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    next();
});
