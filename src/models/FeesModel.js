const mongoose = require("mongoose");

const FeesSchema = new mongoose.Schema({
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
        required: true,
    },
    classId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Class",
        required: true,
    },
    fees: [{
        name: {
            type: String,
            required: true
        },
        fee: {
            type: Number,
            required: true
        }
    }],
    total: {
        type: Number,
        required: true
    },
    isPaid: {
        type: Boolean,
        default: false,
    },
    date: {
        type: Date,
        // required: true, // Uncomment this if you want the date to be mandatory
    },
});

module.exports = mongoose.model("Fees", FeesSchema);
