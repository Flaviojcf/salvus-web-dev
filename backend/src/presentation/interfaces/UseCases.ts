import type CreateProductUseCase from '@/application/useCase/create/CreateProductUseCase'
import type DeleteProductUseCase from '@/application/useCase/delete/DeleteProductUseCase'
import type FindProductUseCase from '@/application/useCase/find/FindProductUseCase'
import type ListProductUseCase from '@/application/useCase/list/ListProductUseCase'
import type UpdateProductUseCase from '@/application/useCase/update/UpdateProductUseCase'

export interface UseCases {
  createProduct: CreateProductUseCase
  findProduct: FindProductUseCase
  deleteProduct: DeleteProductUseCase
  listProduct: ListProductUseCase
  updateProduct: UpdateProductUseCase
}
