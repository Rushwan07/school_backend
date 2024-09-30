const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    childId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Child',
        required: true
    },
    bookingDate: {
        type: Date,
        required: true
    },
    timeSlot: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['confirmed', 'canceled'],
        required: true
    }
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
