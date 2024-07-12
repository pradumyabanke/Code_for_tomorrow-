// controllers/category.controller.js

const Category = require('../models/category.model');

// Create a new category
exports.createCategory = async (req, res) => {
    if (!req.body.categoryName) {
      return res.status(400).json({ message: 'Category name cannot be empty' });
    }
  
    try {
      const newCategory = await Category.create({
        categoryName: req.body.categoryName
      });
      res.status(201).json(newCategory);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

// Get all categories
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single category by categoryId
exports.getCategoryById = async (req, res) => {
  const categoryId = req.params.categoryId;
  try {
    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).json({ message: `Category with id ${categoryId} not found` });
    }
    res.json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a category by categoryId
exports.updateCategoryById = async (req, res) => {
  const categoryId = req.params.categoryId;
  if (!req.body.categoryName) {
    return res.status(400).json({ message: 'Category name cannot be empty' });
  }

  try {
    const updatedCategory = await Category.findByIdAndUpdate(categoryId, {
      categoryName: req.body.categoryName
    }, { new: true });
    if (!updatedCategory) {
      return res.status(404).json({ message: `Category with id ${categoryId} not found` });
    }
    res.json(updatedCategory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete an empty category by categoryId
exports.deleteCategoryById = async (req, res) => {
  const categoryId = req.params.categoryId;
  try {
    const deletedCategory = await Category.findByIdAndDelete(categoryId);
    if (!deletedCategory) {
      return res.status(404).json({ message: `Category with id ${categoryId} not found` });
    }
    res.json({ message: 'Category deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Implement other CRUD operations for categories as needed

module.exports = {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategoryById,
  deleteCategoryById
};
