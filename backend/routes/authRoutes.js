const express = require('express');
const router = express.Router();
const { registerUser, loginUser, forgotPassword, resetPassword } = require('../controllers/authController');

// Route for User Registration
router.post('/register', registerUser);

// Route for User Login
router.post('/login', loginUser);

// Routes for Password Resets
router.post('/forgotpassword', forgotPassword);
router.put('/resetpassword/:resetToken', resetPassword);

module.exports = router;
