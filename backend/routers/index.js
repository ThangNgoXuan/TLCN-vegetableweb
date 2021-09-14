import express from 'express';
import { userRouter } from './user.router.js';

const router = express.Router();

router.use('/user', userRouter);

export const apiv1 = router;

