const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
    regno: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },

    address: {
        type: String,
        required: true,
    },
    img: {
        type: String,
    },
    bloodType: {
        type: String,
    },
    sex: {
        type: String,
        enum: ["MALE", "FEMALE"],
        required: true,
    },
    parentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Parent",
        required: true,
    },
    classId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Class",
        required: true,
    },
    gradeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Grade",
        required: true,
    },
    attendances: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Attendance",
        },
    ],
    results: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Result",
        },
    ],
    birthday: {
        type: Date,
        required: true,
    },
    transportations: {
        pickupLocation: {
            type: String,
        },
        dropOffLocation: {
            type: String,
        },
        busNumber: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Transportation",
        },
    },

}, { timestamps: true });

module.exports = mongoose.model("Student", studentSchema);
