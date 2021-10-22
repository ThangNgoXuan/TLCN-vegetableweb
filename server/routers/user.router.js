import express from 'express';
import { userController } from '../controller/user.controller.js';

const router = express.Router();

router.route('/')
  .get(userController.getUsers)
  .post(userController.registUser);

router.route('/profile/:id')
  .get(userController.getUserProfile);

router.route('/profile').put(userController.updateUserProfile);

router.route('/:id')
  .get(userController.getUserById)
  .put(userController.updateUser)
  .delete(userController.deleteUser)


export const userRouter = router;