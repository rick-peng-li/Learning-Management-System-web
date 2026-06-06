const express = require('express');
const router = express.Router();
const { getCourses, createCourse } = require('../controllers/courseController');
const { protect, teacher } = require('../middleware/authMiddleware');

// Route 1: Anyone can view courses
router.get('/', getCourses);

// Route 2: ONLY logged-in Teachers (or Admins) can create courses
router.post('/', protect, teacher, createCourse);

module.exports = router;
