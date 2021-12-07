import express from 'express';
import { statisticController } from '../controller/statistic.controller.js';

const router = express.Router();

router.route('/all')
  .get(statisticController.statisticAll)

router.route('/topCustomer')
  .get(statisticController.topCustomers)

router.route('/revenue/:by')
  .get(statisticController.getRevenue)
export const statisticRouter = router;