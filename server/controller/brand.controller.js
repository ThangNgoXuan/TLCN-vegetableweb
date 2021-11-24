import asyncHandler from 'express-async-handler';
import { HttpStatusCode } from '../utils/constants.js';
import Brand from '../models/brand.model.js';

// @desc    Get all brands 
// @route   GET /v1/brand
// @access  Public
const getBrands = asyncHandler(async (req, res) => {
  const brands = await Brand.find();

  if (brands) {
    res.json(brands);
  } else {
    res.status(404)
    throw new Error('Không tìm thấy!');
  }
});

// @desc    update brand
// @route   PUT /v1/brand/:id
// @access  Admin Private
const updateBrand = asyncHandler(async (req, res) => {
  const name = req.body.name;

  const brand = await Brand.findById(req.params.id);

  if (brand) {
    brand.name = name;

    const updatedBrand = await Brand.save();
    res.json(updatedBrand);
  } else {
    res.status(404)
    throw new Error('Không tìm thấy!');
  }
});

// @desc    Delete a brand
// @route   DELETE /v1/brand/:id
// @access  Private/Admin
const deleteBrand = asyncHandler(async (req, res) => {
  const brand = await Brand.findById(req.params.id);

  if (brand) {
    await brand.remove();
    res.json({ message: 'Xóa thành công' });
  }
  else {
    res.status(HttpStatusCode.NOT_FOUND);
    throw new Error('Không tìm thấy');
  }
});

// @desc create a brand
// @route POST /v1/brand
//@access Private/admin
const createBrand = asyncHandler(async (req, res) => {
  const brand = new Brand();

  brand.name = req.body.name;

  const createdBrand = await brand.save();
  res.status(HttpStatusCode.CREATED_SUCCESS).json(createBrand);
});

// @desc    Get  brand by id 
// @route   GET /v1/brand/:id
// @access  Public
const getBrand = asyncHandler(async (req, res) => {
  const brand = await Brand.findById(req.params.id);

  if (brand) {
    res.json(brand);
  } else {
    res.status(404)
    throw new Error('Không tìm thấy!');
  }
});

export const brandController = {
  createBrand,
  getBrands,
  updateBrand,
  deleteBrand,
  getBrand,
};

