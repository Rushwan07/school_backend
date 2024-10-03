const mongoose = require("mongoose");

const transportSchema = new mongoose.Schema({
    busNumber: {
        type: Number,
        required: true,
    },
    stops: [
        {
            stopNumber: {
                type: Number,
                required: true,
            },
            place: {
                type: String,
                required: true,
            },
            time: {
                type: Date,
                required: true,
            },
            transportationFees: {
                type: String,
                required: true,
            },
        },
    ],
    driverName: {
        type: String,
        required: true,
    },
    students: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Student",
        },
    ],
});

const Transport = mongoose.model("Transport", transportSchema);

module.exports = Transport;
