const Category = require('../models/Category');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');

// @desc        Get all categories
// @route       GET /api/v1/categories
// @access      Private
exports.getCategories = (req, res, next) => {
  res.status(200).json(res.advancedResults);
};

// @desc        Get single category
// @route       GET /api/v1/categories/:id
// @access      Private
exports.getCategory = asyncHandler(async (req, res, next) => {
  const category = await Category.findById(req.params.id, '-__v');
  if (!category) {
    return next(
      new ErrorResponse(`Category not found with id of ${req.params.id}`, 404)
    );
  }
  res.status(200).json({ success: true, data: category });
});

// @desc        Create new category
// @route       POST /api/v1/categories
// @access      Private
exports.createCategory = asyncHandler(async (req, res, next) => {
  // Add user to req,body
  req.body.userId = req.user.id;
  const category = await Category.create(req.body);
  const newcategory = await Category.findById(category.id, '-__v');
  res.status(201).json({
    success: true,
    data: newcategory,
  });
});

// @desc        Update new category
// @route       PUT /api/v1/categories/:id
// @access      Private
exports.updateCategory = asyncHandler(async (req, res, next) => {
  let category = await Category.findById(req.params.id);

  if (!category) {
    return next(
      new ErrorResponse(`Category not found with id of ${req.params.id}`, 404)
    );
  }

  // Make sure user is bootcamp owner
  if (category.userId.toString() !== req.user.id) {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to update this Category`,
        401
      )
    );
  }

  category = await Category.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  const newcategory = await Category.findById(category.id, '-__v');
  res.status(200).json({ success: true, data: newcategory });
});

// @desc        Delete category
// @route       DELETE /api/v1/categories/:id
// @access      Private
exports.deleteCategory = asyncHandler(async (req, res, next) => {
  const category = await Category.findById(req.params.id);

  if (!category) {
    return next(
      new ErrorResponse(`Category not found with id of ${req.params.id}`, 404)
    );
  }

  // Make sure user is bootcamp owner
  if (category.userId.toString() !== req.user.id) {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to delete this Category`,
        401
      )
    );
  }

  await category.remove();

  res.status(200).json({ success: true, data: {} });
});
