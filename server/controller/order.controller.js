import asyncHandler from 'express-async-handler';
import Order from '../models/order.model.js'

// @desc    Create new order
// @route   POST /v1/orders
// @access  Private

const newOrder = asyncHandler(async (req, res) => {
  const {
    orderItems,
    name,
    phone,
    shipAddress,
    paymentMethod,
    paymentResult,
    totalPrice,
    message,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400)
    throw new Error('No order items');
    return;
  } else {
    const order = new Order({
      user: req.user._id,
      name,
      phone,
      shipAddress,
      paymentMethod,
      paymentResult,
      totalPrice,
      message,
    });

    const createdOrder = await order.save()

    res.status(201).json(createdOrder)
  }
});

// @desc    Get order by ID
// @route   GET /v1/orders/:id
// @access  Private
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).
    populate(
      'user',
      'name email'
    ).
    populate('category')

  if (order) {
    res.json(order)
  } else {
    res.status(404)
    throw new Error('Order not found')
  }
});

// @desc    Get my orders
// @route   GET /v1/orders/myorders
// @access  Private
const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id })
  res.json(orders)
});

// @desc    Get all orders
// @route   GET /v1/orders
// @access  Private/Admin
const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate('user', 'id name')
  res.json(orders)
})
