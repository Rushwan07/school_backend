const mongoose = require("mongoose");

const examSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },

    classId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Class",
        required: true,
    },
    subjects: [
        {
            subjectId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Subject",
                required: true,
            },
            date: { type: Date, required: true },
        },
    ],
    results: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Result",
        },
    ],
});

module.exports = mongoose.model("Exam", examSchema);
