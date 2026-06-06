const Enrollment = require('../models/Enrollment');
const Course = require('../models/Course');

// @desc    Enroll a student in a course
// @route   POST /api/enrollments
// @access  Private (Must be logged in)
const enrollCourse = async (req, res) => {
  try {
    const { courseId } = req.body;

    // Check if the student is already enrolled in this specific course
    const alreadyEnrolled = await Enrollment.findOne({
      student: req.user._id,
      course: courseId
    });

    if (alreadyEnrolled) {
      return res.status(400).json({ message: 'You are already enrolled in this course!' });
    }

    // Create the official enrollment record connecting the Student to the Course
    const enrollment = await Enrollment.create({
      student: req.user._id,
      course: courseId
    });

    res.status(201).json({ message: 'Successfully enrolled!', enrollment });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all courses the logged-in student is enrolled in
// @route   GET /api/enrollments/my-courses
// @access  Private (Must be logged in)
const getMyEnrollments = async (req, res) => {
  try {
    // Find all enrollments for this specific student. 
    // .populate('course') fetches the actual course details (title, price) instead of just the ID!
    const enrollments = await Enrollment.find({ student: req.user._id }).populate('course');
    res.json(enrollments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { enrollCourse, getMyEnrollments };
