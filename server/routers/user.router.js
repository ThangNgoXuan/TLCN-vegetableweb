import express from 'express';
import { userController } from '../controller/user.controller.js';
import { isAuth, isAdmin } from '../middleware/auth.middleware.js';

const router = express.Router();

router.route('/login').post(userController.signinUser);
router.route('/googleLogin').post(userController.googleLogin);

router.route('/profile').put(isAuth, userController.updateUserProfile);

router.route('/profile/:id')
  .get(userController.getUserProfile);

router.route('/:id')
  .get(isAuth, userController.getUserById)
  .put(isAuth, userController.updateUser)
  .delete(isAuth, userController.deleteUser)

router.route('/register')
  .post(userController.registUser);


router.route('/')
  .get(isAuth, isAdmin, userController.getUsers)


export const userRouter = router;