const mongoose = require('mongoose');

const assessmentSchema = new mongoose.Schema({
    childId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: true
    },
    assessmentDate: {
        type: Date,
        required: true
    },
    developmentAreas: {
        type: [String],
        required: true
    },
    comments: {
        type: String,
        default: ''
    }
});

const Assessment = mongoose.model('Assessment', assessmentSchema);

module.exports = Assessment;
