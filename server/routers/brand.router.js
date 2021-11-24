import express from 'express';
import { brandController } from '../controller/brand.controller.js';
const router = express.Router();

router.route('/:id').get(brandController.getBrand)

router.route('/')
  .get(brandController.getBrands)
  .post(brandController.createBrand)

router.route('/:id')
  .put(brandController.updateBrand)
  .delete(brandController.deleteBrand)

export const brandRouter = router;