const mongoose = require("mongoose");

const assignmentSchema = new mongoose.Schema({
    title: { type: String, required: true },
    startDate: { type: Date, required: true },
    dueDate: { type: Date, required: true },
    description: { type: String, required: true },
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

module.exports = mongoose.model("Assignment", assignmentSchema);
