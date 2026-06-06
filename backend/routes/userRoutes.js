const express = require('express');
const router = express.Router();
const { getUsers, getTeachers } = require('../controllers/userController');
const { protect, admin, teacher } = require('../middleware/authMiddleware');

// Route 1: Admins and Teachers can view ALL users
router.get('/', protect, teacher, getUsers);

// Route 2: Any logged-in user can view the list of Teachers
router.get('/teachers', protect, getTeachers);

module.exports = router;
