import FindProductUseCase from '@/application/useCase/find/FindProductUseCase'
import CreateProductUseCase from '@/application/useCase/create/CreateProductUseCase'
import ProductRepository from '@/infrastructure/mysql/prisma/persistance/ProductRepository'
import { type UseCases } from '@/presentation/interfaces/UseCases'

export async function getApplicationUseCases (): Promise<UseCases> {
  const productRepository = new ProductRepository()

  const createProductUseCase = new CreateProductUseCase(productRepository)
  const findProductUseCase = new FindProductUseCase(productRepository)

  return {
    createProduct: createProductUseCase,
    findProduct: findProductUseCase
  }
}
