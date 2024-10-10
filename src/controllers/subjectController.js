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

exports.editSubject = catchAsync(async (req, res, next) => {
    const { subjectId } = req.params;
    const { name, teacherId, exams, lessions, assignments, description } =
        req.body;

    // Find the subject by ID
    const subject = await Subject.findById(subjectId);

    if (!subject) {
        return next(new AppError("Subject not found", 404));
    }

    // Validate inputs
    if (name && !name.trim()) {
        return next(new AppError("Subject name is required", 400));
    }
    if (description && !description.trim()) {
        return next(new AppError("Subject description is required", 400));
    }
    if (lessions && lessions.length === 0) {
        return next(new AppError("At least one lesson is required", 400));
    }

    // Update fields if they are provided in the request body
    if (name) subject.name = name;
    if (description) subject.description = description;
    if (lessions) subject.lessions = lessions;
    if (teacherId) subject.teacherId = teacherId;
    if (exams) subject.exams = exams;
    if (assignments) subject.assignments = assignments;

    // Save the updated subject
    await subject.save();

    res.status(200).json({
        status: "success",
        data: {
            subject,
        },
    });
});
