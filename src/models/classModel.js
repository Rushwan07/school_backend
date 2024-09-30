const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
  activityName: {
    type: String,
    required: true
  },
  duration: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ''
  }
});

const classSchema = new mongoose.Schema({
  className: {
    type: String,
    required: true
  },
  schedule: {
    days: {
      type: [String],
      required: true
    },
    time: {
      type: String,
      required: true
    }
  },
  activities: {
    type: [activitySchema],
    required: true
  }
});

const Class = mongoose.model('Class', classSchema);

module.exports = Class;
