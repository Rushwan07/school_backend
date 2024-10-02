const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ClassSchema = new Schema(
    {
        name: {
            type: String,
            required: true, // e.g., 'Grade 1' or 1st standard
        },
        description: String,
        subjects: [
            {
                name: {
                    type: String,
                    required: true,
                },
                staff: {
                    type: Schema.Types.ObjectId, // particular staff id for this subject
                    ref: "User",
                },
            },
        ],
        students: [
            {
                type: Schema.Types.ObjectId,
                ref: "User", // List of students in this class
            },
        ],
    },
    { timestamps: true }
);

module.exports = mongoose.model("Class", ClassSchema);
