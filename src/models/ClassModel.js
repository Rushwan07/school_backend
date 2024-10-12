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
    teacherId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Teacher",
    },
    subjectsId: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Subject",
        },
    ],
    studentsId: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Student",
        },
    ],

    eventId: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Event",
        },
    ],
    announcementId: [
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
