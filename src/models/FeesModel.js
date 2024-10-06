const mongoose = require("mongoose");

const FeesSchema = new mongoose.Schema({
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
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
    paid: {
        type: Boolean,
        default: false,
    },
    dueDate: {
        type: Date,
        required: true,
    },
});

module.exports = mongoose.model("Fees", FeesSchema);
