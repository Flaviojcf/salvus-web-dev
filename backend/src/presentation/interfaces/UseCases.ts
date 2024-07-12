import type CreateProductUseCase from '@/application/useCase/create/CreateProductUseCase'
import type FindProductUseCase from '@/application/useCase/find/FindProductUseCase'
import type ListProductUseCase from '@/application/useCase/list/ListProductUseCase'
import type UpdateProductUseCase from '@/application/useCase/update/UpdateProductUseCase'

export interface UseCases {
  createProduct: CreateProductUseCase
  findProduct: FindProductUseCase
  // listProduct: ListProductUseCase
  // updateProduct: UpdateProductUseCase
}
