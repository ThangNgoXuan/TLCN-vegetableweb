import ProductCategory from '../models/category.model.js';
import asyncHandler from 'express-async-handler';
import { HttpStatusCode } from '../utils/constants.js';

// @desc    Get all categories 
// @route   GET /v1/category
// @access  Public
const getCategories = asyncHandler(async (req, res) => {
  const categories = await ProductCategory.find();

  if (categories) {
    res.json(categories);
  } else {
    res.status(404)
    throw new Error('Categories not found!');
  }
});

// @desc    update category
// @route   PUT /v1/category/:id
// @access  Staff/Admin Private
const updateCategory = asyncHandler(async (req, res) => {
  const { name, path, displayOrder, image, status } = req.body;

  const category = await ProductCategory.findById(req.params.id);

  if (category) {
    category.name = name;
    category.categorySlug = path;
    category.displayOrder = displayOrder;
    category.status = status;
    category.image = image;

    const updatedCategory = await category.save();
    res.json(updatedCategory);
  } else {
    res.status(404)
    throw new Error('Category not found!');
  }
});

// @desc    Delete a Category
// @route   DELETE /v1/category/:id
// @access  Private/Admin
const deleteCategory = asyncHandler(async (req, res) => {
  const category = await ProductCategory.findById(req.params.id);

  if (category) {
    await category.remove();
    res.json({ message: 'Xóa slide thành công' });
  }
  else {
    res.status(HttpStatusCode.NOT_FOUND);
    throw new Error('Không tìm thấy slide');
  }
});

// @desc create a category
// @route POST /v1/category
//@access Private/staff
const createCategory = asyncHandler(async (req, res) => {
  const category = new ProductCategory();

  category.name = req.body.name;

  const createdCategory = await category.save();
  res.status(HttpStatusCode.CREATED_SUCCESS).json(createdSlide);
});

// @desc    Get  category 
// @route   GET /v1/category/:id
// @access  Public
const getCategory = asyncHandler(async (req, res) => {
  const categories = await ProductCategory.findById(req.params.id);

  if (categories) {
    res.json(categories);
  } else {
    res.status(404)
    throw new Error('Categories not found!');
  }
});

export const productCategoryController = {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory,
  getCategory,
};

