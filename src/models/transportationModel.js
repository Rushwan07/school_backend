const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TransportationsSchema = new Schema(
    {
        busNumber: {
            type: String,
            required: true, // e.g., 'Grade 1' or 1st standard
        },

        stops: [
            {
                type: String,
                required: true,
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

module.exports = mongoose.model("Transportations", TransportationsSchema);
