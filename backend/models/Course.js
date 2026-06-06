const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  instructor: {
    // This creates a relationship! It links to a specific User ID
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  price: {
    type: Number,
    required: true,
    default: 0, // 0 means the course is free
  }
}, { timestamps: true });

module.exports = mongoose.model('Course', courseSchema);
