import express from 'express';
import { productCategoryController } from '../controller/category.controller.js';
const router = express.Router();

router.route('/')
  .get(productCategoryController.getCategories)
  .post(productCategoryController.createCategory)

router.route('/:id')
  .put(productCategoryController.updateCategory)
  .delete(productCategoryController.deleteCategory)

export const categoryRouter = router;