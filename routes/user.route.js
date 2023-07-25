const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');


// User registration route
router.post('/register', userController.registerUser);

// User login route
router.post('/login', userController.loginUser);

module.exports = router;
