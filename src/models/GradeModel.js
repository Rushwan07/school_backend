const mongoose = require("mongoose");

const gradeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    startingMark: {
        type: String,
        required: true,
    },
    endingMark: { type: String, required: true },
});

module.exports = mongoose.model("Grade", gradeSchema);
