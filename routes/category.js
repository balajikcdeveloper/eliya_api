const express = require('express');
const {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
} = require('../controllers/category');

const Category = require('../models/Category');

const router = express.Router();

const { protect, authorize } = require('../middleware/auth');

const advancedResults = require('../middleware/advancedResults');

router
  .route('/')
  .get(protect, advancedResults(Category), getCategories)
  .post(protect, authorize('user', 'admin'), createCategory);

router
  .route('/:id')
  .get(protect, getCategory)
  .put(protect, updateCategory)
  .delete(protect, authorize('user', 'admin'), deleteCategory);

module.exports = router;
