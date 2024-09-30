const mongoose = require('mongoose');

const permissionSchema = new mongoose.Schema({
    childId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: true
    },
    permissionType: {
        type: String,
        required: true
    },
    grantedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        required: true
    },
    dateGranted: {
        type: Date,
        required: true
    }
});

const Permission = mongoose.model('Permission', permissionSchema);

module.exports = Permission;
