const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            unique: true,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            enum: ["student", "teacher", "admin"],
            required: true,
        },
        contactNumber: String,
        address: String,
        regNo: String, //student or teacher register number
    },
    { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
