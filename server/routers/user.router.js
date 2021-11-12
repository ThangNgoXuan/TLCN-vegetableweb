import express from 'express';
import { userController } from '../controller/user.controller.js';

const router = express.Router();

router.route('/login').post(userController.signinUser);
router.route('/googleLogin').post(userController.googleLogin);

router.route('/profile/:id')
  .get(userController.getUserProfile);

router.route('/profile').put(userController.updateUserProfile);

router.route('/:id')
  .get(userController.getUserById)
  .put(userController.updateUser)
  .delete(userController.deleteUser)

router.route('/')
  .get(userController.getUsers)
  .post(userController.registUser);


export const userRouter = router;