import express from 'express';
import { userController } from '../controller/user.controller.js';

const router = express.Router();

router.route('/')
  .get(userController.getUsers)
  .post(userController.registUser);

router.route('/profile/:userId')
  .get(userController.getUserProfile);

router.route('/profile').put(userController.updateUserProfile);


export const userRouter = router;