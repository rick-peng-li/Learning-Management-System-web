const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables (like passwords or secrets)
dotenv.config();

const connectDB = require('./config/db');

// Connect to the Database
connectDB();

// Initialize the Express application
const app = express();

// Middleware Setup
app.use(cors()); // Allows our React frontend to securely talk to this backend
app.use(express.json()); // Allows our backend to understand JSON data (like form submissions)

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/courses', require('./routes/courseRoutes'));
app.use('/api/enrollments', require('./routes/enrollmentRoutes'));
app.use('/api/users', require('./routes/userRoutes')); // Add the users route

// A simple test route
app.get('/', (req, res) => {
  res.send('LMS Backend API is Running successfully!');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
