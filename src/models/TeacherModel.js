const mongoose = require("mongoose");

const teacherSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        unique: true,
    },
    phone: {
        type: String,
        unique: true,
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
    subjects: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Subject",
        },
    ],

    classes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Class",
        },
    ],
    birthday: {
        type: Date,
        required: true,
    },
});

module.exports = mongoose.model("Teacher", teacherSchema);
