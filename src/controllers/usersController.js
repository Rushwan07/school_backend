const catchAsync = require("../utils/catchAsync");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const bcryptjs = require("bcryptjs");

const Student = require("../models/StudentModel");
const Teacher = require("../models/TeacherModel");
const Admin = require("../models/AdminModel");

const AppError = require("../utils/appError");

exports.signin = catchAsync(async (req, res, next) => {
    const { regNo, username, password } = req.body;
    //student login
    if (regNo) {
        const student = await Student.findOne({ regNo: regNo });
        if (!student) return next(new AppError("Enter a valid Regno", 404));

        let token = jwt.sign(
            { role: "student", regNo: regNo, _id: student._id },
            process.env.JWT_SECRET
        );
        var expirationDate = new Date();
        expirationDate.setDate(expirationDate.getDate() + 30);

        res.cookie("token", "bearer " + token, {
            expires: expirationDate,
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "None",
        });

        return res.status(200).json({
            status: "success",
            data: {
                student: student,
            },
        });
    }
    //teacher login
    if (username && password) {
        const admin = await Admin.findOne({ username: username });
        if (admin) {
            const match = bcryptjs.compare(password, admin.password);
            if (!match)
                return next(
                    new AppError("Please enter a correct password", 400)
                );

            let token = jwt.sign(
                { role: "admin", _id: admin._id },
                process.env.JWT_SECRET
            );
            var expirationDate = new Date();
            expirationDate.setDate(expirationDate.getDate() + 30);

            res.cookie("token", "bearer " + token, {
                expires: expirationDate,
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "None",
            });
            admin.password = null;
            return res.status(200).json({
                status: "success",
                data: {
                    admin: admin,
                },
            });
        }

        const teacher = await Teacher.findOne({ username: username });
        if (!teacher) return next(new AppError("Username is not found", 404));

        // const match = await bcryptjs.compare(password, teacher.password);
        const match = password == teacher.password;
        if (!match)
            return next(new AppError("Please enter a correct password", 400));

        let token = jwt.sign(
            { role: "teacher", _id: teacher._id },
            process.env.JWT_SECRET
        );
        var expirationDate = new Date();
        expirationDate.setDate(expirationDate.getDate() + 30);

        res.cookie("token", "bearer " + token, {
            expires: expirationDate,
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "None",
        });
        teacher.password = null;
        return res.status(200).json({
            status: "success",
            data: {
                teacher: teacher,
            },
        });
    } else {
        return next(new AppError("Enter valid username and password", 400));
    }

    res.status(200).json({
        status: "success",
        message: "Signed up and session cookie set",
    });
});

// exports.signup = catchAsync(async (req, res, next) => {});

exports.signout = catchAsync(async (req, res, next) => {
    res.clearCookie("token");

    res.status(200).json({
        status: "success",
        message: "User successfully signed out.",
    });
});

exports.adminSignin = catchAsync(async (req, res, next) => {
    const { username, password } = req.body;
    console.log({ username, password });
    const encrypedpassword = await bcryptjs.hash(password, 8);
    console.log(encrypedpassword);

    const admin = await Admin.create({
        username,
        password: encrypedpassword,
    });
    return res.status(200).json({
        status: "success",
        data: { admin },
    });
});
