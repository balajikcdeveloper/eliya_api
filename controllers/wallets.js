const Wallet = require('../models/Wallet');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');

// @desc        Get all wallets
// @route       GET /api/v1/wallets
// @access      Private
exports.getWallets = (req, res, next) => {
  res.status(200).json(res.advancedResults);
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
exports.updateWallet = asyncHandler(async (req, res, next) => {
  let wallet = await Wallet.findById(req.params.id);

  if (!wallet) {
    return next(
      new ErrorResponse(`Wallet not found with id of ${req.params.id}`, 404)
    );
  }

  wallet = await Wallet.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  const newwallet = await Wallet.findById(wallet.id, '-__v');
  res.status(200).json({ success: true, data: newwallet });
});

// @desc        Delete wallet
// @route       DELETE /api/v1/wallets/:id
// @access      Private
exports.deleteWallet = asyncHandler(async (req, res, next) => {
  const wallet = await Wallet.findById(req.params.id);

  if (!wallet) {
    return next(
      new ErrorResponse(`Wallet not found with id of ${req.params.id}`, 404)
    );
  }

  await wallet.remove();

  res.status(200).json({ success: true, data: {} });
});
