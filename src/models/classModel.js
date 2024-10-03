const mongoose = require("mongoose");

const classSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    capacity: {
        type: Number,
        required: true,
    },
    supervisorId: {
        type: String,
    },
    lessons: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Lesson",
        },
    ],
    students: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Student",
        },
    ],

    events: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Event",
        },
    ],
    announcements: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Announcement",
        },
    ],
    baseFees: {
        type: Number,
        required: true,
    },
});

module.exports = mongoose.model("Class", classSchema);
