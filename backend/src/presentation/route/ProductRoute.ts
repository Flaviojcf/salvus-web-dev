import { Router } from 'express'
import { type UseCases } from '@/presentation/interfaces/UseCases'
import ProductController from '@/presentation/controller/ProductController'

export function getProductRouter (useCases: UseCases): Router {
  const router = Router()

  const productController = new ProductController(useCases.createProduct, useCases.findProduct)

  router.post('/product', productController.create.bind(productController))
  router.get('/product/:id', productController.find.bind(productController))

  return router
}
