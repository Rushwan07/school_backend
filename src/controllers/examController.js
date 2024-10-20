const Exam = require("../models/ExamModel");
const Subject = require("../models/SubjectModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
// {
//     "name": "Exam Name",
//     "description": "Exam Description",
//     "classId": "6704ec91fee39a5e6ebd0162",
//     "subjects": [
//       {
//         "subjectId": "6704ea5418b730aed6cc5089",
//         "date": "2024-10-08"
//       }

//     ]
//   }

exports.createExam = catchAsync(async (req, res, next) => {
    const { name, description, classId, subjects } = req.body;

    if (!subjects || !Array.isArray(subjects) || subjects.length === 0) {
        return next(
            new AppError("Subjects array is required and cannot be empty", 400)
        );
    }

    for (let i = 0; i < subjects.length; i++) {
        const { subjectId, date } = subjects[i];

        if (!subjectId || !date) {
            return next(
                new AppError(
                    `Subject at index ${i} is missing required fields (subjectId or date).`,
                    400
                )
            );
        }

        const subjectExists = await Subject.findById(subjectId);
        if (!subjectExists) {
            return next(
                new AppError(`Subject with id ${subjectId} does not exist`, 404)
            );
        }

        if (isNaN(Date.parse(date))) {
            return next(
                new AppError(
                    `Invalid date format for subject at index ${i}`,
                    400
                )
            );
        }
    }

    const exam = await Exam.create({
        name,
        description,
        classId,
        subjects,
    });
    await exam.populate("classId subjects.subjectId");
    res.status(201).json({
        status: "success",
        data: {
            exam,
        },
    });
});

exports.editExam = catchAsync(async (req, res, next) => {
    const { name, description, classId, subjects } = req.body;
    const { examId } = req.params;

    if (!subjects || !Array.isArray(subjects) || subjects.length === 0) {
        return next(
            new AppError("Subjects array is required and cannot be empty", 400)
        );
    }
    console.log(subjects);
    for (let i = 0; i < subjects.length; i++) {
        const { subjectId, date } = subjects[i];

        if (!subjectId || !date) {
            return next(
                new AppError(
                    `Subject at index ${i} is missing required fields (subjectId or date).`,
                    400
                )
            );
        }

        const subjectExists = await Subject.findById(subjectId);
        if (!subjectExists) {
            return next(
                new AppError(`Subject with id ${subjectId} does not exist`, 404)
            );
        }

        if (isNaN(Date.parse(date))) {
            return next(
                new AppError(
                    `Invalid date format for subject at index ${i}`,
                    400
                )
            );
        }
    }

    const exam = await Exam.findByIdAndUpdate(
        examId,
        {
            name,
            description,
            classId,
            subjects,
        },
        { new: true }
    );
    await exam.populate("classId subjects.subjectId");

    res.status(201).json({
        status: "success",
        data: {
            exam,
        },
    });
});

exports.deleteExam = catchAsync(async (req, res, next) => {
    const { examId } = req.params;
    await Exam.findByIdAndDelete(examId);
    return res.status(200).json({
        status: "success",
        message: "Deleted successfully",
    });
});
exports.getAdminExams = catchAsync(async (req, res, next) => {
    const exam = await Exam.find()
        .populate("classId")
        .populate("subjects.subjectId");

    res.status(201).json({
        status: "success",
        data: {
            exam,
        },
    });
});
exports.getTeacherExams = catchAsync(async (req, res, next) => {
    const classId = req.user.classId;
    const exam = await Exam.find({ classId: { $in: classId } }).populate("classId subjects");
    res.status(201).json({
        status: "success",
        data: {
            exam,
        },
    });
});
exports.getStudentExams = catchAsync(async (req, res, next) => {
    const classId = req.user.classId;
    const exam = await Exam.find({ classId: { $in: classId } })
        .populate("classId")
        .populate({
            path: "results",
            populate: {
                path: "subjects.subjectId",
            },
        })
        .populate({
            path: "subjects",
            populate: {
                path: "subjectId",
            },
        });

    res.status(201).json({
        status: "success",
        data: {
            exam,
        },
    });
});

exports.getExamByClassId = catchAsync(async (req, res, next) => {
    const classId = req.params;
    const exam = await Exam.find({ classId: { $in: classId } })
        .populate("classId")
        .populate({
            path: "results",
            populate: {
                path: "subjects.subjectId",
            },
        })
        .populate({
            path: "subjects",
            populate: {
                path: "subjectId",
            },
        });

    res.status(201).json({
        status: "success",
        data: {
            exam,
        },
    });
});
