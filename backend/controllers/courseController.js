const Course = require('../models/Course');

// @desc    Get all available courses
// @route   GET /api/courses
const getCourses = async (req, res) => {
  try {
    // The .populate() command tells MongoDB to also fetch the Instructor's name and email!
    const courses = await Course.find({}).populate('instructor', 'name email');
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a brand new course
// @route   POST /api/courses
// @access  Private/Admin
const createCourse = async (req, res) => {
  try {
    const { title, description, price } = req.body;

    // Create a new course object
    const course = new Course({
      title,
      description,
      price,
      instructor: req.user._id, // Automatically attach the logged-in Admin as the instructor
    });

    // Save it to MongoDB
    const createdCourse = await course.save();
    res.status(201).json(createdCourse);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getCourses, createCourse };
