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

    if (!name || !description) {
        return next(
            new AppError("Name and description are required fields", 400)
        );
    }

    if (classId) {
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
        fees,
        classId,
    });

    res.status(201).json({
        status: "success",
        data: {
            extraCurricularActivity,
        },
    });
});
