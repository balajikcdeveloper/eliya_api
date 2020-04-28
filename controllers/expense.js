const Expense = require('../models/Expense');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

/**
 * @swagger
 * /expenses:
 *    get:
 *      description: This should return all expenses
 */
exports.getExpenses = (req, res, next) => {
  res.status(200).json(res.advancedResults);
};

/**
 * @swagger
 * /expenses:
 *  get:
 *    description: Use to request expense
 *    responses:
 *      '200':
 *        description: A successful response
 */
exports.getExpense = asyncHandler(async (req, res, next) => {
  const expense = await Expense.findById(req.params.id, '-__v');
  if (!expense) {
    return next(
      new ErrorResponse(`Expenses not found with id of ${req.params.id}`, 404)
    );
  }
  res.status(200).json({ status: res.statusCode, data: expense });
});

// @desc        Create new Expense
// @route       POST /api/v1/expenses
// @access      Private
exports.createExpense = asyncHandler(async (req, res, next) => {
  // Add user to req,body
  req.body.userId = req.user.id;
  const expense = await Expense.create(req.body);
  const newExpense = await Expense.findById(expense.id, '-__v');
  res.status(201).json({
    status: res.statusCode,
    data: newExpense,
  });
});

// @desc        Update new Expense
// @route       PUT /api/v1/expenses/:id
// @access      Private
exports.updateExpense = asyncHandler(async (req, res, next) => {
  let expense = await Expense.findById(req.params.id);

  if (!expense) {
    return next(
      new ErrorResponse(`Expense not found with id of ${req.params.id}`, 404)
    );
  }

  // Make sure user is bootcamp owner
  if (expense.userId.toString() !== req.user.id && req.user.role !== 'user') {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to update this Expense`,
        401
      )
    );
  }

  expense = await Expense.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  const newExpense = await Expense.findById(expense.id, '-__v');
  res.status(200).json({ status: res.statusCode, data: newExpense });
});

// @desc        Delete Expense
// @route       DELETE /api/v1/expenses/:id
// @access      Private
exports.deleteExpense = asyncHandler(async (req, res, next) => {
  const expense = await Expense.findById(req.params.id);

  if (!expense) {
    return next(
      new ErrorResponse(`Expense not found with id of ${req.params.id}`, 404)
    );
  }

  // Make sure user is bootcamp owner
  if (expense.userId.toString() !== req.user.id && req.user.role !== 'user') {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to delete this Expense`,
        401
      )
    );
  }

  await Expense.remove();

  res.status(200).json({ status: res.statusCode, data: {} });
});
