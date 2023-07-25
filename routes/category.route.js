const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/category.controller');
const { authMiddleware } = require('../middlewares/authentication.middleware');
const {authorization}=require("../middlewares/authorization.middleware")


// Private route: create categories routes -- only admin have access of this route 
router.post('/create',authMiddleware,authorization(['admin']), categoryController.createCategory);

// Public route: get all categories with all information
router.get('/all/description', categoryController.getAllCategories);

// Public route: get particular category only
router.get('/:id', categoryController.getSingleCategory);

// Public route: Get all categories with names and IDs only (no descriptions)
router.get('/all/names', categoryController.getSimpleCategories);

module.exports = router;
