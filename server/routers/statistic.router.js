import express from 'express';
import { statisticController } from '../controller/statistic.controller.js';
import { isAdmin, isAuth } from '../middleware/auth.middleware.js';

const router = express.Router();

router.route('/all')
  .get(isAuth, isAdmin, statisticController.statisticAll)

router.route('/topCustomer')
  .get(isAuth, isAdmin, statisticController.topCustomers)

router.route('/revenue/:by')
  .get(isAuth, isAdmin, statisticController.getRevenue)
export const statisticRouter = router;