import express from 'express';
import { slideController } from '../controller/slide.controller.js';
import { isAdmin, isAuth } from '../middleware/auth.middleware.js';

const router = express.Router();

router.route('/admin')
  .get(isAuth, isAdmin, slideController.adminGetSlides)

router.route('/')
  .get(slideController.slides)
  .post(isAuth, isAdmin, slideController.createSlide)

router.route('/:id')
  .get(isAuth, isAdmin, slideController.getSlide)
  .put(isAuth, isAdmin, slideController.updateSlide)
  .delete(isAuth, isAdmin, slideController.deleteSlide)

export const slideRouter = router;