const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const TimeTableSchema = new Schema({
    classId: {
        type: Schema.Types.ObjectId,
        ref: "Class", // Reference to the Class (e.g., Grade 1)
        required: true,
    },

    teacherId: {
        type: Schema.Types.ObjectId,
        ref: "User", // Reference to the Teacher (User with role: 'teacher')
        required: true,
    },
    date: {
        type: Date,
        required: true, // Date when the class is scheduled
    },
    startTime: {
        type: String,
        required: true, // Start time of the class (e.g., '09:00')
    },
    endTime: {
        type: String,
        required: true, // End time of the class (e.g., '10:00')
    },
    room: {
        type: String,
        required: true, // Class location or room number
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: Date,
});

module.exports = mongoose.model("TimeTable", TimeTableSchema);
