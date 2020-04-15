const Wallet = require('../models/Wallet');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');

// @desc        Get all wallets
// @route       GET /api/v1/wallets
// @access      Private
exports.getWallets = (req, res, next) => {
  res.status(200).json({ success: true, msg: 'Show all wallets' });
};

// @desc        Get single wallet
// @route       GET /api/v1/wallets/:id
// @access      Private
exports.getWallet = asyncHandler(async (req, res, next) => {
  const wallet = await Wallet.findById(req.params.id, '-__v');
  if (!wallet) {
    return next(
      new ErrorResponse(`Wallet not found with id of ${req.params.id}`, 404)
    );
  }
  res.status(200).json({ success: true, data: wallet });
});

// @desc        Create new wallet
// @route       POST /api/v1/wallets
// @access      Private
exports.createWallet = asyncHandler(async (req, res, next) => {
  const wallet = await Wallet.create(req.body);
  const newwallet = await Wallet.findById(wallet.id, '-__v');
  res.status(201).json({
    success: true,
    data: newwallet,
  });
});

// @desc        Update new wallet
// @route       PUT /api/v1/wallets/:id
// @access      Private
exports.updateWallet = (req, res, next) => {
  res
    .status(200)
    .json({ success: true, msg: `Update wallet ${req.params.id}` });
};

// @desc        Delete wallet
// @route       DELETE /api/v1/wallets/:id
// @access      Private
exports.deleteWallet = (req, res, next) => {
  res
    .status(200)
    .json({ success: true, msg: `Deleted wallet ${req.params.id}` });
};
