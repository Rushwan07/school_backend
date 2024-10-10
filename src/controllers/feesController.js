const Fees = require("../models/FeesModel");
const Student = require("../models/StudentModel");
const Class = require("../models/ClassModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
// {
//     "studentId":"670504cf9d81be21a0a06e3e",
//     "regNo":"101",
//     "classId":"6704ec91fee39a5e6ebd0162",
//     "baseFees":"500",
//     "transportationFees":"200",
//     "totalFees":"700",
//     "date":"2024-10-03"
//     }
exports.createFeeRecord = catchAsync(async (req, res, next) => {
    const {
        studentId,
        regNo,
        classId,
        baseFees,
        transportationFees,
        totalFees,
        date,
    } = req.body;
    console.log({
        studentId,
        regNo,
        classId,
        baseFees,
        transportationFees,
        totalFees,
        date,
    });
    if (
        !studentId ||
        !regNo ||
        !classId ||
        !baseFees ||
        !transportationFees ||
        !totalFees ||
        !date
    ) {
        return next(new AppError("All fields are required", 400));
    }

    const studentExists = await Student.findById(studentId);
    if (!studentExists) {
        return next(
            new AppError(`Student with id ${studentId} does not exist`, 404)
        );
    }

    const classExists = await Class.findById(classId);
    if (!classExists) {
        return next(
            new AppError(`Class with id ${classId} does not exist`, 404)
        );
    }

    if (isNaN(Date.parse(date))) {
        return next(new AppError("Invalid date format for due date", 400));
    }

    const feeRecord = await Fees.create({
        studentId,
        regNo,
        classId,
        baseFees,
        transportationFees,
        totalFees,
        date,
    });

    res.status(201).json({
        status: "success",
        data: {
            feeRecord,
        },
    });
});
