const Result = require("../models/ResultModel");
const Exam = require("../models/ExamModel");
const Grade = require("../models/GradeModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

exports.createResult = catchAsync(async (req, res, next) => {
    const resultsData = req.body;

    const grades = await Grade.find();

    const gradeMap = grades.reduce((acc, grade) => {
        acc[grade.startingMark] = grade.name;
        return acc;
    }, {});

    const results = [];

    for (const resultData of resultsData) {
        const { subjects, total, examId, classId, studentId } = resultData;

        if (!subjects || !Array.isArray(subjects) || subjects.length === 0) {
            return next(
                new AppError(
                    "Subjects must be an array and cannot be empty",
                    400
                )
            );
        }

        if (!total || !examId || !classId || !studentId) {
            return next(
                new AppError(
                    "Total, examId, classId, and studentId are required",
                    400
                )
            );
        }

        const subjectsWithGrades = subjects.map((subject) => {
            const mark = Number(subject.mark);
            let grade = "F";

            for (const startingMark in gradeMap) {
                if (mark >= Number(startingMark)) {
                    grade = gradeMap[startingMark];
                }
            }

            return {
                subjectId: subject.subjectId,
                mark,
                assignmentMark: Number(subject.assignmentMark),
                grade,
            };
        });

        const newResult = await Result.create({
            subjects: subjectsWithGrades,
            total,
            examId,
            classId,
            studentId,
        });

        const exam = await Exam.findById(examId);

        exam.results.push(newResult._id);
        await exam.save();

        results.push(newResult);
    }

    res.status(201).json({
        status: "success",
        data: {
            results,
        },
    });
});

exports.getResultForExam = catchAsync(async (req, res, next) => {
    const { examId } = req.params;
    const results = await Result.find({ examId: examId });
    res.status(201).json({
        status: "success",
        data: {
            results,
        },
    });
});
