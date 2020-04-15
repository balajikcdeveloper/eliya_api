const express = require('express');
const {
  getWallets,
  getWallet,
  createWallet,
  updateWallet,
  deleteWallet,
} = require('../controllers/wallets');
const router = express.Router();

router.route('/').get(getWallets).post(createWallet);

router.route('/:id').get(getWallet).put(updateWallet).delete(deleteWallet);

module.exports = router;
