const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/category.controller');
const { verifyToken } = require('../middleware/auth.middleware');

// Create a new category
router.post('/category', verifyToken, categoryController.createCategory);

// Get all categories
router.get('/categories', verifyToken, categoryController.getAllCategories);

// Get a single category by categoryId
router.get('/category/:categoryId', verifyToken, categoryController.getCategoryById);

// Update a category by categoryId
router.put('/category/:categoryId', verifyToken, categoryController.updateCategoryById);

// Delete an empty category by categoryId
router.delete('/category/:categoryId', verifyToken, categoryController.deleteCategoryById);

module.exports = router;
