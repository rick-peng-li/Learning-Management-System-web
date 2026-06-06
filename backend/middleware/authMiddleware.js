const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Check if the user is logged in (Has a valid token)
const protect = async (req, res, next) => {
  let token;

  // Check if the request header has an Authorization token
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Extract the token (it looks like "Bearer <token>")
      token = req.headers.authorization.split(' ')[1];

      // Mathematically verify the token using our secret key
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Find the user in the database based on the ID inside the token
      // .select('-password') means "Don't grab the password, for safety"
      req.user = await User.findById(decoded.id).select('-password');

      // The user is valid! Move on to the next step.
      next();
    } catch (error) {
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token provided' });
  }
};

// Check if the user is an Admin
const admin = (req, res, next) => {
  if (req.user && req.user.role === 'Admin') {
    next(); 
  } else {
    res.status(403).json({ message: 'Not authorized as an Admin' });
  }
};

// Check if the user is a Teacher (Admins can also act as teachers)
const teacher = (req, res, next) => {
  if (req.user && (req.user.role === 'Teacher' || req.user.role === 'Admin')) {
    next();
  } else {
    res.status(403).json({ message: 'Not authorized as a Teacher' });
  }
};

module.exports = { protect, admin, teacher };
