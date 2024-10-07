const mongoose = require("mongoose");

const FeesSchema = new mongoose.Schema({
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
        required: true,
    },
    regNo: {
        type: String,
        required: true,
    },
    classId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Class",
        required: true,
    },
    baseFees: {
        type: Number,
        required: true,
    },
    transportationFees: {
        type: Number,
        required: true,
    },
    totalFees: {
        type: Number,
        required: true,
    },
    isPaid: {
        type: Boolean,
        default: false,
    },
    dueDate: {
        type: Date,
        required: true,
    },
});

module.exports = mongoose.model("Fees", FeesSchema);
