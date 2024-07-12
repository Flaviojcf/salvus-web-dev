import { Router } from 'express'
import { type UseCases } from '@/presentation/interfaces/UseCases'
import ProductController from '@/presentation/controller/ProductController'

export function getProductRouter (useCases: UseCases): Router {
  const router = Router()

  const productController = new ProductController(useCases.createProduct)

  router.post('/product', productController.create.bind(productController))

  return router
}
