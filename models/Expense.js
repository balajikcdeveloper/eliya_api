const mongoose = require('mongoose');
const slugify = require('slugify');

const ExpenseSchema = new mongoose.Schema({
  dateTime: {
    type: Date,
    default: Date.now,
  },
  amount: {
    type: Number,
  },
  description: {
    type: String,
    maxlength: [500, 'Description can not be more than 500 characters'],
  },
  typeId: {
    type: mongoose.Schema.ObjectId,
    ref: 'ExpenseType',
    required: true,
  },
  categoryId: {
    type: mongoose.Schema.ObjectId,
    ref: 'Category',
    required: true,
  },
  walletId: {
    type: mongoose.Schema.ObjectId,
    ref: 'Wallet',
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

module.exports = mongoose.model('Expense', ExpenseSchema);
