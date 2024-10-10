const mongoose = require("mongoose");

const attendanceCountSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true,
        unique: true,
    },
    presentCount: {
        type: Number,
        default: 0,
    },
    absentCount: {
        type: Number,
        default: 0,
    },
    totalStudents: {
        type: Number,
        default: 0,
    },
    month: {
        type: String,
    },
});

module.exports = mongoose.model("AttendanceCount", attendanceCountSchema);
