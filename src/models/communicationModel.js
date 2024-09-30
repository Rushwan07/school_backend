const mongoose = require('mongoose');

const communicationSchema = new mongoose.Schema({
    parentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    message: {
        type: String,
        required: true // The content of the message
    },
    dateSent: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        enum: ['sent', 'received'], // Possible values for status
        required: true
    }
});

const Communication = mongoose.model('Communication', communicationSchema);

module.exports = Communication;
