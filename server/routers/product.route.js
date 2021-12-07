import express from 'express'
import { productController } from '../controller/product.controller.js'
import { isAdmin, isAuth } from '../middleware/auth.middleware.js';

const router = express.Router();


router.route('/top-product')
  .get(productController.getTopProduct)

router.route('/product-related/:id')
  .get(productController.getTopProductRelate)

router.route('/search/:text').get(productController.searchProduct)

router.route('/:id')
  .get(productController.getProductById)
  .delete(isAuth, isAdmin, productController.deleteProduct)
  .put(isAuth, isAdmin, productController.updateProduct)

router.route('/admin/search')
  .get(isAuth, isAdmin, productController.getProductsAdmin)

router.route('/')
  .get(productController.getProducts)
  .post(isAuth, isAdmin, productController.createProduct)

export const productRouter = router;