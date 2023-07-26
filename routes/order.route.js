const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order.controller');
const { authMiddleware } = require('../middlewares/authentication.middleware');

// Protected route: Create an order (place an order for products in the cart)
router.post('/create', authMiddleware, orderController.createOrder);

// Protected route: Get the order history for the authenticated user
router.get('/history', authMiddleware, orderController.getOrderHistory);

// Protected route: Get the details of a specific order by ID
router.get('/details/:id', authMiddleware, orderController.getOrderDetails);

module.exports = router;
