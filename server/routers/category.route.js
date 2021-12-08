import express from 'express';
import { productCategoryController } from '../controller/category.controller.js';
const router = express.Router();
import { isAdmin, isAuth } from '../middleware/auth.middleware.js';

router.route('/:id').get(productCategoryController.getCategory)

router.route('/')
  .get(productCategoryController.getCategories)
  .post(isAuth, isAdmin, productCategoryController.createCategory)

router.route('/admin').get(isAuth, isAdmin, productCategoryController.adminGetCategories)

router.route('/:id')
  .put(isAuth, isAdmin, productCategoryController.updateCategory)
  .delete(isAuth, isAdmin, productCategoryController.deleteCategory)

export const categoryRouter = router;