const mongoose = require('mongoose');

const habitSchema = new mongoose.Schema({
  habit: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  user: {
    type: String,
    required: true
  },
  timestamp: true
});

module.exports = mongoose.model('Habit', habitSchema);
