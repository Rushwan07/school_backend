const mongoose = require('mongoose');

const transportSchema = new mongoose.Schema({
    childId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Child',
        required: true
    },
    transportType: {
        type: String,
        enum: ['bus', 'van', 'other'],
        required: true
    },
    pickupLocation: {
        type: String,
        required: true
    },
    dropoffLocation: {
        type: String,
        required: true
    },
    emergencyContact: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Contact',
        required: true
    }
});

const Transport = mongoose.model('Transport', transportSchema);

module.exports = Transport;
