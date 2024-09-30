const mongoose = require('mongoose');

const waitlistSchema = new mongoose.Schema({
    childId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Child',
        required: true
    },
    waitlistDate: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        enum: ['active', 'removed'],
        required: true
    },
    priorityLevel: {
        type: Number,
        required: true,
        min: 1
    }
});

const Waitlist = mongoose.model('Waitlist', waitlistSchema);

module.exports = Waitlist;
