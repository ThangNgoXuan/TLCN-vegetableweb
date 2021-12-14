import express from 'express'
import { orderController } from '../controller/order.controller.js';
import { isAdmin, isAuth } from '../middleware/auth.middleware.js';

const router = express.Router();

router.route('/myOrder/:id').get(isAuth, orderController.getMyOrders);

router.route('/sendmail').post(orderController.sendMailOrder);

router.route('/admin')
  .get(isAuth, isAdmin, orderController.adminGetOrders)

router.route('/online-pay/:id').put(isAuth, orderController.paypalPayment)

router.route('/:id')
  .get(isAuth, orderController.getOrderById)
  .put(isAuth, orderController.adminUpdateOrder)


router.route('/')
  .get(isAuth, orderController.getOrders)
  .post(isAuth, orderController.newOrder)


export const orderRouter = router;
