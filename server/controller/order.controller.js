import asyncHandler from 'express-async-handler';
import Order from '../models/order.model.js'
import { updateProductQuantity } from './product.controller.js';
import { sendMail } from '../utils/sendMail.js'

// @desc    Create new order
// @route   POST /v1/orders
// @access  Private

const newOrder = asyncHandler(async (req, res) => {
  const {
    orderItems,
    firstName,
    lastName,
    mail,
    phone,
    shipAddress,
    paymentMethod,
    paymentResult,
    totalPrice,
    message,
    user,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400)
    throw new Error('No order items');
    return;
  } else {
    orderItems.product = orderItems._id;
    const order = new Order({
      user,
      firstName,
      lastName,
      mail,
      phone,
      shipAddress,
      paymentMethod,
      paymentResult,
      totalPrice,
      message,
      orderItems,
    });
    console.log(' 1 create')
    const createdOrder = await order.save();
    console.log(' 2 create')

    const updatedProduct = updateProductQuantity(orderItems);
    console.log(' 3 create')

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
// @route   GET /v1/order/myOrder/:id
// @access  Private
const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.params.id }).populate('orderItems.product')
  res.json(orders)
});

// @desc    Get all orders
// @route   GET /v1/orders
// @access  Private/Admin
const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({})
    .populate('user', 'id name')
    .populate('orderItems.product')

  res.json(orders)
})

const sendMailOrder = (req, res, next) => {
  const { userInfo, cartItems } = req.body;
  const sub = 'Đơn hàng';

  let htmlContent = `<p>Chào ${userInfo.firstName},</p>
  <p>Cảm ơn bạn đã đặt hàng tại Yummy Food. Dưới đây là chi tiết đơn hàng của bạn.</p>
  <table style="border: 1px solid black; border-collapse: collapse;">
      <thead>
          <tr>
          <th scope="col" style="border: 1px solid black; border-collapse: collapse;">Hình ảnh</th>
          <th scope="col" style="border: 1px solid black; border-collapse: collapse;">Tên sản phẩm</th>
          <th scope="col" style="border: 1px solid black; border-collapse: collapse;">Đơn giá</th>
          <th scope="col" style="border: 1px solid black; border-collapse: collapse;">Số lượng</th>
          <th scope="col" style="border: 1px solid black; border-collapse: collapse;">Thành tiền</th>
          </tr>
      </thead>
      <tbody>`;

  for (let item of cartItems) {
    htmlContent += `
      <tr>
          <td style="border: 1px solid black; border-collapse: collapse;"><img src="${item.image[0]}" height="100"></th>
          <td style="border: 1px solid black; border-collapse: collapse;">${item.name}</td>
          <td style="border: 1px solid black; border-collapse: collapse;">${item.price}</td>
          <td style="border: 1px solid black; border-collapse: collapse;">${item.quantity}</td>
          <td style="border: 1px solid black; border-collapse: collapse;">${item.price * item.quantity}đ</td>
      </tr >
      `
  }

  htmlContent += `
  </tbody></table>
  <p>Cảm ơn bạn đã tin tưởng chúng tôi. Chúc bạn 1 ngày vui vẻ!</p>
  <p>Yummy Food</p>`;

  try {
    sendMail(userInfo.email, sub, htmlContent);
    res.send({ message: 'Send mail successfully!' });
  } catch (error) {
    res.send({ message: error.message });
  }
}

const adminUpdateOrder = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findById(req.params.id);

    if (order) {
      if (status === 'DA_GIAO') {
        order.paymentResult = true;
        order.paidAt = Date.now();
        order.status = status;
      } else {
        order.status = status;
      }
      const updatedOrder = await order.save();

      res.status(200).json(updatedOrder);
    } else {
      res.status(404);
      throw new Error('Không tìm thấy đơn hàng');
    }
  } catch (error) {
    res.json({ message: error.message });
  }
}

export const orderController = {
  getOrders,
  getOrderById,
  getMyOrders,
  newOrder,
  sendMailOrder,
  adminUpdateOrder,
};