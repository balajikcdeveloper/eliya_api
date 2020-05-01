const Wallet = require('../models/Wallet');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

/**
 * @swagger
 * /wallets:
 *    get:
 *      description: This should return all wallets
 */
exports.getWallets = (req, res, next) => {
  res.status(200).json(res.advancedResults);
};

/**
 * @swagger
 * /wallets:
 *  get:
 *    description: Use to request wallet
 *    responses:
 *      '200':
 *        description: A successful response
 */
exports.getWallet = asyncHandler(async (req, res, next) => {
  const wallet = await Wallet.findById(req.params.id, '-__v');
  if (!wallet) {
    return next(
      new ErrorResponse(`Wallet not found with id of ${req.params.id}`, 404)
    );
  }
  res.status(200).json({ status: res.statusCode, data: wallet });
});

// @desc        Create new wallet
// @route       POST /api/v1/wallets
// @access      Private
exports.createWallet = asyncHandler(async (req, res, next) => {
  // Add user to req,body
  req.body.userId = req.user.id;
  const wallet = await Wallet.create(req.body);
  const newwallet = await Wallet.findById(wallet.id, '-__v');
  res.status(201).json({
    status: res.statusCode,
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

  // Make sure user is bootcamp owner
  if (wallet.userId.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to update this wallet`,
        401
      )
    );
  }

  wallet = await Wallet.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  const newwallet = await Wallet.findById(wallet.id, '-__v');
  res.status(200).json({ status: res.statusCode, data: newwallet });
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

  // Make sure user is bootcamp owner
  if (wallet.userId.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to delete this wallet`,
        401
      )
    );
  }

  await wallet.remove();

  res.status(200).json({ status: res.statusCode, data: {} });
});
