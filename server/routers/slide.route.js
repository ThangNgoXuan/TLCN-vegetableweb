import express from 'express';
import { slideController } from '../controller/slide.controller.js';

const router = express.Router();

router.route('/')
  .get(slideController.slides)
  .post(slideController.createSlide)

router.route('/:id')
  .get(slideController.getSlide)
  .put(slideController.updateSlide)
  .delete(slideController.deleteSlide)

export const slideRouter = router;