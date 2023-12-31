const express = require('express');
const dotenv = require('dotenv');
const rateLimit = require('express-rate-limit');
const connectDB = require('./config/db');
const { specs, swaggerUi } = require('./swaggerConfig');
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

// Import Category routes
const categoryRoutes=require("./routes/category.route")
app.use("/category",categoryRoutes)

// Import Products routes
const productRoutes=require("./routes/product.route")
app.use("/product",productRoutes)

// Import Cart routes
const cartRoutes=require("./routes/cart.route")
app.use("/cart",cartRoutes)

// Import Product routes
const orderRoutes=require("./routes/order.route")
app.use("/order",orderRoutes)

// Serve Swagger documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Start the server
app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});
