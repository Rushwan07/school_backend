const mongoose = require("mongoose");

const resultSchema = new mongoose.Schema(
    {
        subjects: [
            {
                subjectId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Subject",
                    required: true,
                },
                mark: { type: Number, required: true },
                assignmentMark: {
                    type: Number,
                },
                grade: {
                    type: String,
                    required: true,
                },
            },
        ],
        total: {
            type: Number,
            required: true,
        },
        examId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Exam",
            required: true,
        },
        classId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Class",
            required: true,
        },
        studentId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Student",
            required: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Result", resultSchema);
