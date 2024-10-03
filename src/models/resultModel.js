const mongoose = require("mongoose");

const resultSchema = new mongoose.Schema({
    score: {
        type: Number,
        required: true,
    },
    examId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Exam",
        required: true,
    },
    assignmentId: {
        ref: "Assignment",
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
        required: true,
    },
});

module.exports = mongoose.model("Result", resultSchema);
