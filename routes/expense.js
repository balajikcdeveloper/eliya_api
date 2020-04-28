const express = require('express');
const {
  getExpenses,
  getExpense,
  createExpense,
  updateExpense,
  deleteExpense,
} = require('../controllers/expense');

const Expense = require('../models/Expense');

const router = express.Router();

const { protect, authorize } = require('../middleware/auth');

const advancedResults = require('../middleware/advancedResults');

router
  .route('/')
  .get(protect, advancedResults(Expense), getExpenses)
  .post(protect, authorize('user', 'admin'), createExpense);

router
  .route('/:id')
  .get(protect, getExpense)
  .put(protect, updateExpense)
  .delete(protect, authorize('user', 'admin'), deleteExpense);

module.exports = router;
