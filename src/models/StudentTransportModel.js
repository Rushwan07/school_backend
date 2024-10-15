const mongoose = require("mongoose");

const StudentTransport = new mongoose.Schema({
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
    },
    // regNo: {
    //     type: String,
    //     unique: true,
    // },

    pickupLocation: {
        type: String,
    },
    // dropOffLocation: {
    //     type: String,
    // },
    busId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Transportation",
    },
    fees: {
        type: Number,
    },
});

module.exports = mongoose.model("StudentTransport", StudentTransport);
