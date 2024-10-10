const mongoose = require("mongoose");

const subjectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    // day: {
    //     type: String,
    //     enum: ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY"],
    //     required: true,
    // },
    // startTime: {
    //     type: Date,
    //     required: true,
    // },
    // endTime: {
    //     type: Date,
    //     required: true,
    // },

    // classId: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Class",
    //     required: true,
    // },
    teacherId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Teacher",
        // required: true,
    },
    exams: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Exam",
        },
    ],
    lessions: [
        {
            type: String,
            required: true,
        },
    ],
    assignments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Assignment",
        },
    ],
});

module.exports = mongoose.model("Subject", subjectSchema);
