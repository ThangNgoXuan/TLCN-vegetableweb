import asyncHandler from 'express-async-handler';
import { Product } from '../models/product.model';
import { HttpStatusCode } from '../utils/constants.js';

// @desc    Fetch all products
// @route   GET /v1/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
  const pageSize = 10;
  const page = Number(req.query)
})

// @desc    Fetch single product
// @route   GET /v1/products/:id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.json(product);
  }
  else {
    res.status(HttpStatusCode.NOT_FOUND);
    throw new Error('Không tìm thấy sản phẩm');
  }
});

// @desc    Delete a product
// @route   DELETE /v1/products/:id
// @access  Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await product.findById(req.params.id);

  if (product) {
    await product.remove();
    res.json({ message: 'Xóa sản phẩm thành công' });
  }
  else {
    res.status(HttpStatusCode.NOT_FOUND);
    throw new Error('Không tìm thấy sản phẩm');
  }
});

// @desc create a product
// @route POST /v1/products
//@access Private/staff
const createProduct = asyncHandler(async (req, res) => {
  const product = new Product();

  product.name = req.body.name;
  product.images = req.body.images;
  product.brand = req.body.brand;
  product.category = req.body.category;
  product.staff = req.body.staff;
  product.description = req.body.description;
  product.price = req.body.price;
  product.qtyInStock = req.body.qtyInStock;

  const createdProduct = await product.save();
  res.status(HttpStatusCode.CREATED_SUCCESS).json(createdProduct);
})

//@desc   update product
//@route  PUT /v1/products/:id
//@access private/staff
const updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = req.body.name;
    product.images = req.body.images;
    product.brand = req.body.brand;
    product.category = req.body.category;
    product.staff = req.body.staff;
    product.description = req.body.description;
    product.price = req.body.price;
    product.qtyInStock = req.body.qtyInStock;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  }
  else {
    res.status(HttpStatusCode.NOT_FOUND);
    throw new Error('Không tìm thấy sản phẩm');
  }
});

// @desc    add new reviews
// @route   POST /v1/products/:id/reviews
// @access  user/ private
const reviewProduct = asyncHandler(async (req, res) => {
  const product = await product.findById(req.params.id);

  if (product) {
    const existReview = await product.reviews.find(

    );
  }
})
