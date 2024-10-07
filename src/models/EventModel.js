const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    dates: [
        {
            type: Date,
        },
    ],
    startTime: {
        type: String,
    },
    endTime: {
        type: String,
    },
    classId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Class",
    },
});

module.exports = mongoose.model("Event", eventSchema);
