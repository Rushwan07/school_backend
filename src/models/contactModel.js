const mongoose = require('mongoose');

const contactInfoSchema = new mongoose.Schema({
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }
});

const contactSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    relationship: {
        type: String,
        enum: ['mother', 'father', 'guardian', 'other'],
        required: true
    },
    contactInfo: {
        type: contactInfoSchema,
        required: true
    }
});

const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;
