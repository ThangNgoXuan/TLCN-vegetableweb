import express from 'express';
import { brandController } from '../controller/brand.controller.js';
const router = express.Router();
import { isAdmin, isAuth } from '../middleware/auth.middleware.js';

router.route('/:id')
  .get(brandController.getBrand)
  .put(isAuth, isAdmin, brandController.updateBrand)
  .delete(isAuth, isAdmin, brandController.deleteBrand)

router.route('/')
  .get(brandController.getBrands)
  .post(isAuth, isAdmin, brandController.createBrand)

export const brandRouter = router;