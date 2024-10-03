const mongoose = require("mongoose");

const examSchema = new mongoose.Schema({
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
    subjectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Subject",
        required: true,
    },
    results: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Result",
        },
    ],
});

module.exports = mongoose.model("Exam", examSchema);
