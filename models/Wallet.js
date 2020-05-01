const mongoose = require('mongoose');
const slugify = require('slugify');

const WalletSchema = new mongoose.Schema({
  name: {
    type: String,
    maxlength: [50, 'Name can not be more than 50 characters'],
  },
  slug: String,
  amount: {
    type: Number,
    default: 0,
  },
  description: {
    type: String,
    maxlength: [500, 'Description can not be more than 500 characters'],
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

// Create Wallet slug from the name
WalletSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

module.exports = mongoose.model('Wallet', WalletSchema);
