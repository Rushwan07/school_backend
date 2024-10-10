const Subject = require("../models/SubjectModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
// {
//     "name":"tamil", "lessions":["lession1","lession2"], "description":"descriptin for the subject"
// }
exports.createSubject = catchAsync(async (req, res, next) => {
    const { name, teacherId, exams, lessions, assignments, description } =
        req.body;

    if (!name || !name.trim()) {
        return next(new AppError("Subject name is required", 400));
    }
    if (!description) {
        return next(new AppError("Subject description is required", 400));
    }
    if (!lessions || lessions.length === 0) {
        return next(new AppError("At least one lesson is required", 400));
    }

    const newSubject = await Subject.create({
        name,
        description,
        teacherId,
        exams,
        lessions,
        assignments,
    });

    res.status(201).json({
        status: "success",
        data: {
            subject: newSubject,
        },
    });
});
