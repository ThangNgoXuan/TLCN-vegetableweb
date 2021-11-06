import express from 'express'
import { productController } from '../controller/product.controller.js'

const router = express.Router();


router.route('/top-product')
  .get(productController.getTopProduct)

router.route('/product-related/:id')
  .get(productController.getTopProductRelate)

router.route('/search/:text').get(productController.searchProduct)

router.route('/:id')
  .get(productController.getProductById)
  .delete(productController.deleteProduct)
  .put(productController.updateProduct)

router.route('/')
  .get(productController.getProducts)
  .post(productController.createProduct)

export const productRouter = router;