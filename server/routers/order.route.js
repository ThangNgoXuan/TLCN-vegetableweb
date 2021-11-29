import express from 'express'
import { orderController } from '../controller/order.controller.js'

const router = express.Router();

router.route('/myOrder/:id').get(orderController.getMyOrders);
router.route('/sendmail').post(orderController.sendMailOrder);
router.route('/:id').get(orderController.getOrderById)
router.route('/')
  .get(orderController.getOrders)
  .post(orderController.newOrder);

export const orderRouter = router;
