const mongoose = require('mongoose');

const ExpenseTypeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'please add a expense type'],
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

module.exports = mongoose.model('ExpenseType', ExpenseTypeSchema);
