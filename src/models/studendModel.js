const mongoose = require("mongoose");

const emergencyContactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    relationship: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
});

const studentSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: [true, "Please enter the child's first name."],
        },
        lastName: {
            type: String,
            required: [true, "Please enter the child's last name."],
        },
        dateOfBirth: {
            type: Date,
            required: [true, "Please enter the child's date of birth."],
        },
        gender: {
            type: String,
            enum: ["male", "female", "other"],
            required: [true, "Please specify the child's gender."],
        },
        registrationDate: {
            type: Date,
            default: Date.now,
        },
        parentId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: [true, "Parent ID is required."],
        },
        medicalInfo: {
            type: String, 
        },
        emergencyContacts: [emergencyContactSchema], 
        permissions: {
            type: [String], 
        },
    },
    { timestamps: true }
);

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
