const mongoose = require('mongoose');

const feeSchema = new mongoose.Schema({
    childId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Child',
        required: true
    },
    feeType: {
        type: String,
        enum: ['tuition', 'transport', 'other'],
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    paid: {
        type: Boolean,
        default: false
    },
    dueDate: {
        type: Date,
        required: true
    }
});

const Fee = mongoose.model('Fee', feeSchema);

module.exports = Fee;
