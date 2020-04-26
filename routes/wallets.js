const express = require('express');
const {
  getWallets,
  getWallet,
  createWallet,
  updateWallet,
  deleteWallet,
} = require('../controllers/wallets');

const Wallet = require('../models/Wallet');

const router = express.Router();

const { protect, authorize } = require('../middleware/auth');

const advancedResults = require('../middleware/advancedResults');

router
  .route('/')
  .get(protect, advancedResults(Wallet), getWallets)
  .post(protect, authorize('user', 'admin'), createWallet);

router
  .route('/:id')
  .get(protect, getWallet)
  .put(protect, updateWallet)
  .delete(protect, authorize('user', 'admin'), deleteWallet);

module.exports = router;
