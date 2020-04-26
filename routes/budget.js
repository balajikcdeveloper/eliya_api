const express = require('express');
const {
  getBudgets,
  getBudget,
  createBudget,
  updateBudget,
  deleteBudget,
} = require('../controllers/budget');

const Budget = require('../models/Budget');

const router = express.Router();

const { protect, authorize } = require('../middleware/auth');

const advancedResults = require('../middleware/advancedResults');

router
  .route('/')
  .get(protect, advancedResults(Budget), getBudgets)
  .post(protect, authorize('user', 'admin'), createBudget);

router
  .route('/:id')
  .get(protect, getBudget)
  .put(protect, updateBudget)
  .delete(protect, authorize('user', 'admin'), deleteBudget);

module.exports = router;
