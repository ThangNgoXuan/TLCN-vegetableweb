import express from 'express';
import { userRouter } from './user.router.js';
import { productRouter } from './product.route.js';
import { slideRouter } from './slide.route.js';
import { categoryRouter } from './category.route.js';
import { uploadsRouter } from './upload.route.js';
import { orderRouter } from './order.route.js';
import { brandRouter } from './brand.router.js';


const router = express.Router();

router.use('/user', userRouter);

router.use('/products', productRouter);

router.use('/slide', slideRouter);

router.use('/category', categoryRouter);

router.use('/upload', uploadsRouter);

router.use('/order', orderRouter);

router.use('/brand', brandRouter);

export const apiv1 = router;

