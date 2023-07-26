const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         email:
 *           type: string
 *           format: email
 *         mobile:
 *           type: string
 *           pattern: ^\d{10}$ # Validate for 10-digit mobile number
 *         password:
 *           type: string
 *           format: password # The password format is not specified in OpenAPI, just for demonstration.
 *       example:
 *         name: John Doe
 *         email: johndoe@example.com
 *         mobile: "1234567890"
 *         password: "password123"
 */

/**
 * @swagger
 * /user/register:
 *   post:
 *     summary: Register a new user
 *     tags:
 *       - User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: User registered successfully.
 *       400:
 *         description: User with this email or mobile number already exists.
 *       500:
 *         description: Internal server error.
 */
router.post('/register', userController.registerUser);

/**
 * @swagger
 * /user/login:
 *   post:
 *     summary: User login
 *     tags:
 *       - User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 format: password
 *             required:
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: Login successful. Returns a JWT token.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Login successful.
 *                 token:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       401:
 *         description: Invalid password or user not found with this email.
 *       500:
 *         description: Internal server error.
 */
router.post('/login', userController.loginUser);

module.exports = router;
