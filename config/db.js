const mongoose = require('mongoose');
require('dotenv').config()

const mongoURI = process.env.MONGO_URI;
const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log('MongoDB connected successfully.');
  } catch (error) {
    console.error('MongoDB connection error:',error.message);
    process.exit(1); // Exit process with a failure
  }
};

module.exports = connectDB;
