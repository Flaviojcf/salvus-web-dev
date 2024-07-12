import FindProductUseCase from '@/application/useCase/find/FindProductUseCase'
import CreateProductUseCase from '@/application/useCase/create/CreateProductUseCase'
import ProductRepository from '@/infrastructure/mysql/prisma/persistance/ProductRepository'
import { type UseCases } from '@/presentation/interfaces/UseCases'
import DeleteProductUseCase from '@/application/useCase/delete/DeleteProductUseCase'
import ListProductUseCase from '@/application/useCase/list/ListProductUseCase'

export async function getApplicationUseCases (): Promise<UseCases> {
  const productRepository = new ProductRepository()

  const createProductUseCase = new CreateProductUseCase(productRepository)
  const findProductUseCase = new FindProductUseCase(productRepository)
  const deleteProductUseCase = new DeleteProductUseCase(productRepository, findProductUseCase)
  const listProductUseCase = new ListProductUseCase(productRepository)

  return {
    createProduct: createProductUseCase,
    findProduct: findProductUseCase,
    deleteProduct: deleteProductUseCase,
    listProduct: listProductUseCase
  }
}
