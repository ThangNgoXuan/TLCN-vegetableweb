import { orderController } from '../controller/order.controller.js'
import express from 'express'

const router = express.Router();

router.route('/myOrder').get(orderController.getMyOrders);
router.route('/:id').get(orderController.getOrderById)
router.route('/')
  .get(orderController.getOrders)
  .post(orderController.newOrder);

export const orderRouter = router;
