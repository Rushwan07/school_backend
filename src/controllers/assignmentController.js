const Assignment = require("../models/AssignmentModel");
const Class = require("../models/ClassModel");
const Subject = require("../models/SubjectModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
// {
//     "title":"Write about some one",
//     "startDate":"2024-10-4",
//     "dueDate":"2024-10-18",
//     "description":"description about the assignment",
//     "classId":"6704ec91fee39a5e6ebd0162",
//     "subjectId":"6704ea5418b730aed6cc5089"
//     }

exports.createAssignment = catchAsync(async (req, res, next) => {
    const { title, startDate, dueDate, description, classId, subjectId } =
        req.body;

    if (
        !title ||
        !startDate ||
        !dueDate ||
        !description ||
        !classId ||
        !subjectId
    ) {
        return next(
            new AppError(
                "Title, startDate, dueDate, description, classId, and subjectId are required fields",
                400
            )
        );
    }

    const classExists = await Class.findById(classId);
    if (!classExists) {
        return next(new AppError("Class not found", 404));
    }

    const subjectExists = await Subject.findById(subjectId);
    if (!subjectExists) {
        return next(new AppError("Subject not found", 404));
    }

    const newAssignment = await Assignment.create({
        title,
        startDate,
        dueDate,
        description,
        classId,
        subjectId,
    });

    res.status(201).json({
        status: "success",
        data: {
            assignment: newAssignment,
        },
    });
});
