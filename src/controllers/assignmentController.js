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
    console.log("Done0")

    const { title, startDate, dueDate, description, classId, subjectId } =
        req.body;

        console.log("Done")
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
    console.log("Done2")

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
    console.log("Done3")

    res.status(201).json({
        status: "success",
        data: {
            assignment: newAssignment,
        },
    });
});

exports.editAssignment = catchAsync(async (req, res, next) => {
    const { assignmentId } = req.params;

    if (!assignmentId) {
        return next(new AppError("Assignment required ", 400));
    }

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

    const editedAssignment = await Assignment.findByIdAndUpdate(
        assignmentId,
        {
            title,
            startDate,
            dueDate,
            description,
            classId,
            subjectId,
        },
        { new: true }
    );
    res.status(201).json({
        status: "success",
        data: {
            assignment: editedAssignment,
        },
    });
});
exports.deleteAssignment = catchAsync(async (req, res, next) => {
    const { assignmentId } = req.params;

    if (!assignmentId) {
        return next(new AppError("Assignment  required ", 400));
    }

    await Assignment.findByIdAndDelete(assignmentId);
    return res.status(200).json({
        status: "success",
        message: "Deleted successfully",
    });
});

exports.getAssignmentsForAdmin = catchAsync(async (req, res, next) => {
    const assignments = await Assignment.find();

    res.status(200).json({
        status: "success",
        data: {
            assignments,
        },
    });
});

exports.getAnouncementsForStaff = catchAsync(async (req, res, next) => {
    const teacherClassIds = req.user.classId;

    const assignments = await Assignment.find({
        $or: [{ classId: { $in: teacherClassIds } }, { classId: null }],
    });

    res.status(200).json({
        status: "success",
        data: {
            assignments,
        },
    });
});

exports.getAnouncementsForStudents = catchAsync(async (req, res, next) => {
    const studentClassId = req.user.classId;

    const announcements = await Assignment.find({
        $or: [{ classId: studentClassId }, { classId: null }],
    });

    res.status(200).json({
        status: "success",
        data: {
            announcements,
        },
    });
});
