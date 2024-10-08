const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true,
    },
    classId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Class",
        required: true,
    },
    students: [
        {
            studentId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Student",
                required: true,
            },
            attendance: {
                type: Boolean,
                default: true,
            },
        },
    ],
});

module.exports = mongoose.model("Attendance", attendanceSchema);
