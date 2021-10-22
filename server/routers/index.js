import express from 'express';
import { userRouter } from './user.router.js';
import { productRouter } from './product.route.js';
import { slideRouter } from './slide.route.js';
import { categoryRouter } from './category.route.js';

const router = express.Router();

router.use('/user', userRouter);

router.use('/products', productRouter);

router.use('/slide', slideRouter);

router.use('/category', categoryRouter)

export const apiv1 = router;

