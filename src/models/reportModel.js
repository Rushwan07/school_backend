const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
    reportType: {
        type: String,
        required: true
    },
    data: {
        type: [mongoose.Schema.Types.Mixed],
        required: true
    }
});

const Report = mongoose.model('Report', reportSchema);

module.exports = Report;
