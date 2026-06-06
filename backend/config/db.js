const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // We try to connect to the database using the connection string from our .env file
    const conn = await mongoose.connect(process.env.MONGO_URI);
    
    console.log(`MongoDB Connected successfully: ${conn.connection.host}`);
  } catch (error) {
    // If it fails, we log the error and stop the server
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
