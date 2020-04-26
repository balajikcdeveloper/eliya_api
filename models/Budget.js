const mongoose = require('mongoose');
const slugify = require('slugify');

const BudgetSchema = new mongoose.Schema({
  amount: {
    type: Number,
    default: 0,
  },
  categoryId: {
    type: mongoose.Schema.ObjectId,
    ref: 'Category',
    required: true,
  },
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Budget', BudgetSchema);
