const mongoose = require("mongoose");

const resultSchema = new mongoose.Schema({
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

    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
        required: true,
    },
});

module.exports = mongoose.model("Result", resultSchema);
