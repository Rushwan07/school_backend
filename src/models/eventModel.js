const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    startTime: {
        type: Date,
        required: true,
    },
    endTime: {
        type: Date,
        required: true,
    },
    classId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Class",
    },
});

module.exports = mongoose.model("Event", eventSchema);
