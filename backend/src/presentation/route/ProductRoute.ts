import { Router } from 'express'
import { type UseCases } from '@/presentation/interfaces/UseCases'
import ProductController from '@/presentation/controller/ProductController'

export function getProductRouter (useCases: UseCases): Router {
  const router = Router()

  const productController = new ProductController(useCases.createProduct, useCases.findProduct, useCases.deleteProduct)

  router.post('/product', productController.create.bind(productController))
  router.get('/product/:id', productController.find.bind(productController))
  router.delete('/product/:id', productController.delete.bind(productController))

  return router
}
