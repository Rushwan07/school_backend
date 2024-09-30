const mongoose = require('mongoose');

const enquirySchema = new mongoose.Schema({
    parentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    childId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Child',
        required: true
    },
    visitDate: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'resolved'],
        required: true
    },
    notes: {
        type: String,
        default: ''
    }
});

const Enquiry = mongoose.model('Enquiry', enquirySchema);

module.exports = Enquiry;
