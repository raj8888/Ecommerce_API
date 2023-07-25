const express = require('express');
const dotenv = require('dotenv');
const rateLimit = require('express-rate-limit');
const connectDB = require('./config/db');
dotenv.config();

const app = express();
const port = process.env.PORT || 4500;

// Middleware to JSON format
app.use(express.json());

const limiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 200,
});
  
app.use(limiter);

// Connect to MongoDB
connectDB();

// Import user routes
const userRoutes = require('./routes/user.route');
app.use('/user', userRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});
