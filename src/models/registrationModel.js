const mongoose = require('mongoose');

const registrationSchema = new mongoose.Schema({
    childId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Child',
        required: true
    },
    registrationDate: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        enum: ['enrolled', 'pending'],
        required: true
    },
    paymentStatus: {
        type: String,
        enum: ['paid', 'unpaid'],
        required: true
    }
});

const Registration = mongoose.model('Registration', registrationSchema);

module.exports = Registration;
