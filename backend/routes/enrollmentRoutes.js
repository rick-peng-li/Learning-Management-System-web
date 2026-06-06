const express = require('express');
const router = express.Router();
const { enrollCourse, getMyEnrollments } = require('../controllers/enrollmentController');
const { protect } = require('../middleware/authMiddleware');

// Notice we only use "protect" here, not "admin"! Any logged-in student can enroll.
router.post('/', protect, enrollCourse);
router.get('/my-courses', protect, getMyEnrollments);

module.exports = router;
