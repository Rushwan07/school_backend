const Class = require("../models/ClassModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
// {
//     "name":"X A",
//     "capacity":"10",
//     "teacherId":"6704dec78614c254200856f5",
//     "subjectsId":[],
//     "studentsId":[],
//     "baseFees":"5000"
//     }
exports.createClass = catchAsync(async (req, res, next) => {
    const {
        name,
        capacity,
        teacherId,
        subjectsId,
        studentsId,
        eventId,
        announcementId,
        baseFees,
    } = req.body;

    if (!name || !name.trim()) {
        return next(new AppError("Class name is required", 400));
    }
    if (!capacity || capacity <= 0) {
        return next(
            new AppError("Class capacity must be a positive number", 400)
        );
    }
    if (!baseFees || baseFees < 0) {
        return next(
            new AppError("Base fees must be a non-negative number", 400)
        );
    }

    const existingClass = await Class.findOne({ name });
    if (existingClass) {
        return next(new AppError("Class name already exists", 400));
    }

    const newClass = await Class.create({
        name,
        capacity,
        teacherId,
        subjectsId,
        studentsId,
        eventId,
        announcementId,
        baseFees,
    });

    res.status(201).json({
        status: "success",
        data: {
            class: newClass,
        },
    });
});
