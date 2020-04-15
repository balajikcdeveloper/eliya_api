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

const advancedResults = require('../middleware/advancedResults');

router.route('/').get(advancedResults(Wallet), getWallets).post(createWallet);

router.route('/:id').get(getWallet).put(updateWallet).delete(deleteWallet);

module.exports = router;
