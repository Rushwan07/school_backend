const Grade = require("../models/GradeModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
// {

//     "name":"B+",
//     "startingMark":"40",
//     "endingMark":"50"
//     }
exports.createGrade = catchAsync(async (req, res, next) => {
    const { name, startingMark, endingMark } = req.body;

    if (!name || !startingMark || !endingMark) {
        return next(new AppError("All fields are required", 400));
    }

    const newGrade = await Grade.create({
        name,
        startingMark,
        endingMark,
    });

    res.status(201).json({
        status: "success",
        data: {
            grade: newGrade,
        },
    });
});
