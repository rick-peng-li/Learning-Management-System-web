const mongoose = require('mongoose');

const reportSchema = mongoose.Schema(
  {
    student: { 
      type: mongoose.Schema.Types.ObjectId, 
      required: true, 
      ref: 'User' 
    },
    teacher: { 
      type: mongoose.Schema.Types.ObjectId, 
      required: true, 
      ref: 'User' 
    },
    course: { 
      type: mongoose.Schema.Types.ObjectId, 
      required: true, 
      ref: 'Course' 
    },
    grade: { 
      type: String, 
      required: true 
    },
    feedback: { 
      type: String, 
      required: true 
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Report', reportSchema);
