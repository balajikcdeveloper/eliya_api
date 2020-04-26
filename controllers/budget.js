const Budget = require('../models/Budget');
const Category = require('../models/Category');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');

// @desc        Get all budgets
// @route       GET /api/v1/budgets
// @access      Private
exports.getBudgets = (req, res, next) => {
  res.status(200).json(res.advancedResults);
};

// @desc        Get single budget
// @route       GET /api/v1/budgets/:id
// @access      Private
exports.getBudget = asyncHandler(async (req, res, next) => {
  const budget = await Budget.findById(req.params.id, '-__v');
  if (!budget) {
    return next(
      new ErrorResponse(`Budget not found with id of ${req.params.id}`, 404)
    );
  }
  res.status(200).json({ statusCode: res.statusCode, data: budget });
});

// @desc        Create new budget
// @route       POST /api/v1/budgets
// @access      Private
exports.createBudget = asyncHandler(async (req, res, next) => {
  req.body.userId = req.user.id;
  const budgetExist = await Budget.findOne({
    categoryId: req.query.categoryId,
    userId: req.body.userId,
  });
  console.log(budgetExist);
  // Add user to req,body
  req.body.userId = req.user.id;
  req.body.categoryId = req.query.categoryId;
  if (!budgetExist) {
    const budget = await Budget.create(req.body);
    const newbudget = await Budget.findById(budget.id, '-__v');
    res.status(201).json({
      statusCode: res.statusCode,
      data: newbudget,
    });
  } else {
    return next(
      new ErrorResponse(
        `Budget found with Category Id of ${req.query.categoryId}`,
        400
      )
    );
  }
});

// @desc        Update new budget
// @route       PUT /api/v1/budgets/:id
// @access      Private
exports.updateBudget = asyncHandler(async (req, res, next) => {
  let budget = await Budget.findById(req.params.id);

  if (!budget) {
    return next(
      new ErrorResponse(`Budget not found with id of ${req.params.id}`, 404)
    );
  }

  // Make sure user is owner
  if (budget.userId.toString() !== req.user.id) {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to update this Budget`,
        401
      )
    );
  }

  budget = await Budget.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  const newbudget = await Budget.findById(budget.id, '-__v');
  res.status(200).json({ statusCode: res.statusCode, data: newbudget });
});

// @desc        Delete budget
// @route       DELETE /api/v1/budgets/:id
// @access      Private
exports.deleteBudget = asyncHandler(async (req, res, next) => {
  const budget = await Budget.findById(req.params.id);

  if (!budget) {
    return next(
      new ErrorResponse(`Budget not found with id of ${req.params.id}`, 404)
    );
  }

  // Make sure user is owner
  if (budget.userId.toString() !== req.user.id) {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to delete this Budget`,
        401
      )
    );
  }

  await budget.remove();

  res.status(200).json({ statusCode: res.statusCode, data: {} });
});
