import asyncHandler from 'express-async-handler';
import Order from '../models/order.model.js'
import { updateProductQuantity } from './product.controller.js';
import { sendMail } from '../utils/sendMail.js';
import mongoose from 'mongoose';

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
    address,
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
      address,
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
  //console.log('ok')
  const order = await Order.findById(req.params.id).
    populate(
      'user',
      'name email'
    )
    .populate('orderItems.product', 'name images')
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
  const orders = await Order.find({ user: req.params.id }).populate('orderItems.product').sort({ "createdAt": -1 })
  res.json(orders)
});

// @desc    Get all orders
// @route   GET /v1/orders
// @access  Private/Admin
const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({})
    .populate('user', 'id name')
    .populate('orderItems.product')
    .sort({ "createdAt": -1 })

  res.json(orders)
})

const sendMailOrder = (req, res, next) => {
  const { userInfo, cartItems } = req.body;
  const sub = 'Đơn hàng';

  let htmlContent = `<p>Chào ${userInfo.firstName},</p>
  <p>Cảm ơn bạn đã đặt hàng tại Nông sản hữu cơ. Dưới đây là chi tiết đơn hàng của bạn.</p>
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
  <p>Nông sản hữu cơ</p>`;

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
        order.isPaid = true;
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
};


const userUpdateOrder = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findById(req.params.id);

    if (order) {
      if (order.status === 'DANG_XU_LY' && status === 'DA_HUY') {
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
};

// @desc    Fetch all orders
// @route   GET /v1/order
// @access  Private / admin/staff
const adminGetOrders = async (req, res) => {
  const pageSize = 10;
  const page = Number(req.query.pageNumber) || 1;
  const keyword = req.query.keyword === 'undefined' ? '' : req.query.keyword;
  //console.log(keyword)
  let objectId = mongoose.Types.ObjectId;
  if (objectId.isValid(keyword)) {
    const kq = await Order.findById(keyword)
    if (kq) {
      res.json([kq]);
      return
    }
  }

  const searchFilter = keyword ? {
    $or: [
      {
        firstName: {
          $regex: keyword,
          $options: "$i"
        }
      },
      {
        lastName: {
          $regex: keyword,
          $options: "$i"
        }
      },
      {
        mail: {
          $regex: keyword,
          //$options: "$i"
        }
      },
      {
        status: {
          $regex: keyword,
          //$options: "$i"
        }
      },
      {
        phone: {
          $regex: keyword,
          $options: "$i"
        }
      },
    ]
  } : {}

  const count = await Order.count({
    ...searchFilter,
  });

  const orders = await Order.find({
    ...searchFilter,
  })
    .populate({ path: 'user', select: 'name' })
    .sort({ 'createdAt': -1 })
    .skip(pageSize * (page - 1))
    .limit(pageSize);

  if (orders) {
    res.json({ orders, page, pages: Math.ceil(count / pageSize) });
  } else {
    res.json([]).status(HttpStatusCode.NOT_FOUND);
    throw new Error('Không tìm thấy đơn hàng');
  }
};

const paypalPayment = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (order) {
      order.isPaid = true;
      order.paidAt = Date.now();
      order.paymentResult = {
        id: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        email_address: req.body.email_address,
      };
      const updatedOrder = await order.save();
      // console.log(updatedOrder)
      res.send({ message: 'Đã thanh toán', order: updatedOrder });
    } else {
      res.status(404).send({ message: 'Không tìm thấy đơn hàng' })
    }

  } catch (error) {
    res.send({ message: error.message })
  }
}

export const orderController = {
  getOrders,
  getOrderById,
  getMyOrders,
  newOrder,
  sendMailOrder,
  adminUpdateOrder,
  adminGetOrders,
  paypalPayment,
  userUpdateOrder,
};