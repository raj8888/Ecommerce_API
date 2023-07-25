const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
dotenv.config();

const app = express();
const port = process.env.PORT || 4500;

// Middleware
app.use(express.json());

// Connect to MongoDB
connectDB();

// Start the server
app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});
