const ExpenseType = require('../models/ExpenseType');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

/**
 * @swagger
 * /expensetypes:
 *    get:
 *      description: This should return all ExpenseTypes
 */
exports.getExpenseTypes = (req, res, next) => {
  res.status(200).json(res.advancedResults);
};

/**
 * @swagger
 * /expensetypes:
 *  get:
 *    description: Use to request expensetypes
 *    responses:
 *      '200':
 *        description: A successful response
 */
exports.getExpenseType = asyncHandler(async (req, res, next) => {
  const expenseType = await ExpenseType.findById(req.params.id, '-__v');
  if (!expenseType) {
    return next(
      new ErrorResponse(`Expense Type not found with id of ${req.params.id}`, 404)
    );
  }
  res.status(200).json({ status: res.statusCode, data: expenseType });
});

// @desc        Create new expensetype
// @route       POST /api/v1/expensetypes
// @access      Private
exports.createExpenseType = asyncHandler(async (req, res, next) => {
  // Add user to req,body
  const expenseTypeExist = await ExpenseType.findOne({
    name: req.body.name,
  });
  if (!expenseTypeExist) {
    const expenseType = await ExpenseType.create(req.body);
    const newExpenseType = await ExpenseType.findById(expenseType.id, '-__v');
    res.status(201).json({
      status: res.statusCode,
      data: newExpenseType,
    });
  } else {
    return next(
      new ErrorResponse(`Expense Type found with type of ${req.body.name}`, 409)
    );
  }
});

// @desc        Update new expensetype
// @route       PUT /api/v1/expensetypes/:id
// @access      Private
exports.updateExpenseType = asyncHandler(async (req, res, next) => {
  let expenseType = await ExpenseType.findById(req.params.id);

  if (!expenseType) {
    return next(
      new ErrorResponse(`Expense Type not found with id of ${req.params.id}`, 404)
    );
  }

  expenseType = await ExpenseType.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  const newExpenseType = await ExpenseType.findById(expenseType.id, '-__v');
  res.status(200).json({ status: res.statusCode, data: newExpenseType });
});

// @desc        Delete expensetype
// @route       DELETE /api/v1/expensetypes/:id
// @access      Private
exports.deleteExpenseType = asyncHandler(async (req, res, next) => {
  const expenseType = await ExpenseType.findById(req.params.id);

  if (!expenseType) {
    return next(
      new ErrorResponse(`Expense Type not found with id of ${req.params.id}`, 404)
    );
  }

  await expenseType.remove();

  res.status(200).json({ status: res.statusCode, data: {} });
});
