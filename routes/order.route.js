const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order.controller');
const { authMiddleware } = require('../middlewares/authentication.middleware');

/**
 * @swagger
 * tags:
 *   name: Order
 *   description: API endpoints for managing orders.
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Order:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: 6112345678abcdef01234567
 *         user:
 *           type: string
 *           example: 6112345678abcdef01234567
 *         products:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               product:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     example: 6112345678abcdef01234567
 *                   title:
 *                     type: string
 *                     example: Product A
 *                   price:
 *                     type: number
 *                     example: 19.99
 *               quantity:
 *                 type: number
 *                 example: 2
 *         totalPrice:
 *           type: number
 *           example: 39.98
 *         orderDate:
 *           type: string
 *           format: date-time
 *           example: '2023-07-25T12:34:56Z'
 */

/**
 * @swagger
 * /order/create:
 *   post:
 *     summary: Create an order (place an order for products in the cart)
 *     tags: [Order]
 *     security:
 *       - bearerAuth: [] # Use JWT token for authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               products:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     productId:
 *                       type: string
 *                       example: 6112345678abcdef01234567
 *                     quantity:
 *                       type: number
 *                       example: 2
 *             required:
 *               - products
 *     responses:
 *       201:
 *         description: Order placed successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Order placed successfully.
 *                 order:
 *                   $ref: '#/components/schemas/Order'
 *       400:
 *         description: No products in the cart. Add products to the cart before placing an order.
 *       401:
 *         description: Unauthorized. Missing or invalid JWT token.
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /order/history:
 *   get:
 *     summary: Get the order history for the authenticated user
 *     tags: [Order]
 *     security:
 *       - bearerAuth: [] # Use JWT token for authentication
 *     responses:
 *       200:
 *         description: Successful operation. Returns an array of order history.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 orderHistory:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Order'
 *       401:
 *         description: Unauthorized. Missing or invalid JWT token.
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /order/details/{id}:
 *   get:
 *     summary: Get the details of a specific order by ID
 *     tags: [Order]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Order ID
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful operation. Returns the order details.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 order:
 *                   $ref: '#/components/schemas/Order'
 *       404:
 *         description: Order not found.
 *       500:
 *         description: Internal server error.
 */

// Protected route: Create an order (Only authenticated users can place an order)
router.post('/create', authMiddleware, orderController.createOrder);

// Protected route: Get the order history for the authenticated user
router.get('/history', authMiddleware, orderController.getOrderHistory);

// Protected route: Get the details of a specific order by ID
router.get('/details/:id', authMiddleware, orderController.getOrderDetails);

module.exports = router;
