const Teacher = require("../models/TeacherModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

// {
//     "username": "teacher",
//     "password": "password",
//     "name":"teacher2.0",
//     "email":"teacher@gmail.com",
//     "phone":"8977847262",
//   "address":"address of the teacher",
//   "img":"firebase image upload",
//   "bloodType":"o+",
//   "sex":"MALE",
//   "subjects":[],
//   "classes":[],
//     "birthday": "2012-05-15"
//   }

exports.createTeacher = catchAsync(async (req, res, next) => {
    const {
        username,
        password,
        name,
        email,
        phone,
        address,
        img,
        bloodType,
        sex,
        subjects,
        classes,
        birthday,
    } = req.body;

    if (!username || !username.trim()) {
        return next(new AppError("Enter a valid username", 400));
    }
    if (!password || password.length < 4) {
        return next(
            new AppError("Password must be at least 4 characters long", 400)
        );
    }
    if (!name || !name.trim()) {
        return next(new AppError("Name is required", 400));
    }
    if (!address || !address.trim()) {
        return next(new AppError("Address is required", 400));
    }
    if (!sex || !["MALE", "FEMALE"].includes(sex)) {
        return next(new AppError("Sex must be either MALE or FEMALE", 400));
    }
    if (!birthday) {
        return next(new AppError("Birthday is required", 400));
    }

    const existingUsername = await Teacher.findOne({ username });
    if (existingUsername) {
        return next(new AppError("Username already exists", 400));
    }
    if (email) {
        const existingEmail = await Teacher.findOne({ email });
        if (existingEmail) {
            return next(new AppError("Email already exists", 400));
        }
    }
    if (phone) {
        const existingPhone = await Teacher.findOne({ phone });
        if (existingPhone) {
            return next(new AppError("Phone number already exists", 400));
        }
    }

    const newTeacher = await Teacher.create({
        username,
        password,
        name,
        email,
        phone,
        address,
        img,
        bloodType,
        sex,
        subjects,
        classes,
        birthday,
    });

    res.status(201).json({
        status: "success",
        data: {
            teacher: newTeacher,
        },
    });
});