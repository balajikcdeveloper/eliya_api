const express = require('express');
const {
  getExpenseTypes,
  getExpenseType,
  createExpenseType,
  updateExpenseType,
  deleteExpenseType,
} = require('../controllers/expenseType');

const ExpenseType = require('../models/ExpenseType');

const router = express.Router();

const { protect, authorize } = require('../middleware/auth');

const advancedResults = require('../middleware/advancedResults');

router
  .route('/')
  .get(protect, advancedResults(ExpenseType), getExpenseTypes)
  .post(protect, authorize('user', 'admin'), createExpenseType);

router
  .route('/:id')
  .get(protect, getExpenseType)
  .put(protect, updateExpenseType)
  .delete(protect, authorize('user', 'admin'), deleteExpenseType);

module.exports = router;
