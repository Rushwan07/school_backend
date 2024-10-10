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

    absentDays: [
        {
            type: Date,
        },
    ],

    birthday: {
        type: Date,
        required: true,
    },
    transportations: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "StudentTransport",
    },
});

module.exports = mongoose.model("Student", studentSchema);
