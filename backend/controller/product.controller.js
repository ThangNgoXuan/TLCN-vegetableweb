import asyncHandler from 'express-async-handler';
import Product from '../models/product.model.js';
import { HttpStatusCode } from '../utils/constants.js';

// @desc    Fetch all products
// @route   GET /v1/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
  const pageSize = 10;
  const page = Number(req.query.pageNumber) || 1;
  const name = req.query.name || '';
  const category = req.query.category || '';
  const certification = req.query.certification || '';
  const protype = req.query.protype || '';
  const order = req.query.order || '';
  const min =
    req.query.min && Number(req.query.min) !== 0 ? Number(req.query.min) : 0;
  const max =
    req.query.max && Number(req.query.max) !== 0 ? Number(req.query.max) : 0;

  const nameFilter = name ? { name: { $regex: name, $options: 'i' } } : {};
  const categoryFilter = category ? { category } : {};
  const certificationFilter = certification ? { certification } : {};
  const protypeFilter = protype ? { protype } : {};
  const priceFilter = min && max ? { price: { $gte: min, $lte: max } } : {};
  const sortOrder =
    order === 'lowest'
      ? { price: 1 }
      : order === 'highest'
        ? { price: -1 }
        : { _id: -1 };

  const count = await Product.count({
    ...nameFilter,
    ...categoryFilter,
    ...certificationFilter,
    ...protypeFilter,
    ...priceFilter,
  });

  const products = await Product.find({
    ...nameFilter,
    ...categoryFilter,
    ...priceFilter,
  })
    .sort(sortOrder)
    .skip(pageSize * (page - 1))
    .limit(pageSize);

  if (products) {
    res.send({ products, page, pages: Math.ceil(count / pageSize) });
  } else {
    res.json({}).status(HttpStatusCode.NOT_FOUND);
    throw new Error('Không tìm thấy sản phẩm');
  }
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
  product.creator = req.body.creator;
  product.description = req.body.description;
  product.price = req.body.price;
  product.qtyInStock = req.body.qtyInStock || 0;
  product.certification = req.body.certification;
  product.protype = req.body.protype;

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
    product.creator = req.body.creator;
    product.description = req.body.description;
    product.price = req.body.price;
    product.qtyInStock = req.body.qtyInStock;
    product.certification = req.body.certification;
    product.protype = req.body.protype;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  }
  else {
    res.status(HttpStatusCode.NOT_FOUND);
    throw new Error('Không tìm thấy sản phẩm');
  }
});

//@desc   search product
//@route  get /v1/products/search/:text
//@access public
const searchProduct = asyncHandler(async (req, res) => {

  const text = req.params.text;

  const products = await Product.find({ name: { $regex: text, $options: '$i' } });

  if (products) {
    res.json(products);
  } else {
    throw new Error('Khong tim thay san pham');
  }

});

//@desc   get top 10 products
//@route  get /v1/products/top-product
//@access public
const getTopProduct = asyncHandler(async (req, res) => {
  const products = await Product.find({}).sort({ sold: -1 }).limit(10)

  if (products) {
    res.send({ products });
  } else {
    throw new Error('Khong tim thay san pham');
  }
})

//@desc   get top products related
//@route  get /v1/products/product-related/:categoryId
//@access public
const getTopProductRelate = asyncHandler(async (req, res) => {

  // const id = isValidObjectId(req.params.categoryId)
  // var c = new isValidObjectId()
  const products = await Product.find({ category: req.params.categoryId }).sort({ sold: -1 }).limit(10)

  if (products) {
    res.send({ products });
  } else {
    throw new Error('Khong tim thay san pham');
  }
})

export const productController = {
  searchProduct,
  updateProduct,
  createProduct,
  getProductById,
  getProducts,
  deleteProduct,
  getTopProduct,
  getTopProductRelate,
};

