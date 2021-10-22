import express from 'express'
import { productController } from '../controller/product.controller.js'

const router = express.Router();


router.route('/')
  .get(productController.getProducts)
  .post(productController.createProduct)

router.route('/top-product')
  .get(productController.getTopProduct)


router.route('/:id')
  .get(productController.getProductById)
  .delete(productController.deleteProduct)
  .put(productController.updateProduct)

router.route('/search/:text').get(productController.searchProduct)

router.route('/product-related/:categoryId')
  .get(productController.getTopProductRelate)


export const productRouter = router;