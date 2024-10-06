const mongoose = require("mongoose");

const gradeSchema = new mongoose.Schema({
    level: {
        type: Number,
        required: true,
        unique: true,
    },
    students: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Student",
        },
    ],
    classes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Class",
        },
    ],
});

module.exports = mongoose.model("Grade", gradeSchema);
