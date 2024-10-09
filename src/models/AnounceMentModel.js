const mongoose = require("mongoose");

const announcementSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },

        classId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Class",
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Announcement", announcementSchema);
