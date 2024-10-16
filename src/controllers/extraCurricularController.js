const ExtraCurricularActivities = require("../models/ExtraCurricularActivityesModel");
const Class = require("../models/ClassModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
// {

//     "name": "activity name",
//     "description": "description for the activity",

//     "duedate": "2024-10-23"

// }
exports.createExtraCurricularActivity = catchAsync(async (req, res, next) => {
    const { name, description, duedate, fees, classId } = req.body;
    console.log(req.body);

    if (!name || !description) {
        return next(
            new AppError("Name and description are required fields", 400)
        );
    }

    if (classId.trim() && classId != "--") {
        const classExists = await Class.findById(classId);
        if (!classExists) {
            return next(
                new AppError(`Class with id ${classId} does not exist`, 404)
            );
        }
    }

    if (duedate && isNaN(Date.parse(duedate))) {
        return next(new AppError("Invalid date format for due date", 400));
    }

    const extraCurricularActivity = await ExtraCurricularActivities.create({
        name,
        description,
        duedate,
        fees: fees > 0 ? fees : null,
        classId: classId != "--" ? classId : null,
    });

    const val = await extraCurricularActivity.populate("classId");

    res.status(201).json({
        status: "success",
        data: {
            extraCurricularActivity: val,
        },
    });
});

exports.deleteExtraCurricularActivity = catchAsync(async (req, res, next) => {
    const { activityId } = req.params;
    await ExtraCurricularActivities.findByIdAndDelete(activityId);
    res.status(200).json({
        status: "success",
        message: "Deleted successfully",
    });
});
exports.editExtraCurricularActivity = catchAsync(async (req, res, next) => {
    const { activityId } = req.params;
    const { name, description, duedate, fees, classId } = req.body;

    if (!name || !description) {
        return next(
            new AppError("Name and description are required fields", 400)
        );
    }

    if (classId.trim() && classId != "--") {
        const classExists = await Class.findById(classId);
        if (!classExists) {
            return next(
                new AppError(`Class with id ${classId} does not exist`, 404)
            );
        }
    }

    if (duedate && isNaN(Date.parse(duedate))) {
        return next(new AppError("Invalid date format for due date", 400));
    }

    const extraCurricularActivity =
        await ExtraCurricularActivities.findByIdAndUpdate(
            activityId,
            {
                name,
                description,
                duedate,
                fees: fees > 0 ? fees : null,
                classId: classId != "--" ? classId : null,
            },
            { new: true }
        );
    await extraCurricularActivity.populate("classId");
    res.status(201).json({
        status: "success",
        data: {
            extraCurricularActivity,
        },
    });
});
exports.getAdminExtraCurricularActivity = catchAsync(async (req, res, next) => {
    const extraCurricularActivity =
        await ExtraCurricularActivities.find().populate("classId");
    res.status(200).json({
        status: "success",
        data: {
            extraCurricularActivity,
        },
    });
});
exports.getStudentExtraCurricularActivity = catchAsync(
    async (req, res, next) => {
        const classId = req.user.classId;
        const extraCurricularActivity = await ExtraCurricularActivities.find({
            $or: [{ classId: { $in: classId } }, { classId: null }],
        }).populate("classId");
        res.status(200).json({
            status: "success",
            data: {
                extraCurricularActivity,
            },
        });
    }
);
exports.getTeacherExtraCurricularActivity = catchAsync(
    async (req, res, next) => {
        const classId = req.user.classId;
        const extraCurricularActivity = await ExtraCurricularActivities.find({
            $or: [{ classId: { $in: classId } }, { classId: null }],
        }).populate("classId");
        res.status(200).json({
            status: "success",
            data: {
                extraCurricularActivity,
            },
        });
    }
);
