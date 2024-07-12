import type IProductRepository from '@/domain/repositories/IProductRepository'
import type InputDeleteProductDTO from './dto/DeleteProductDTO'
import type FindProductUseCase from '../find/FindProductUseCase'
import { type ErrorResponse } from '@/presentation/interfaces/ErrorResponse'

export default class DeleteProductUseCase {
  private readonly _productRepository: IProductRepository
  private readonly _findProductUseCase: FindProductUseCase

  constructor (productRepository: IProductRepository, findProductUseCase: FindProductUseCase) {
    this._productRepository = productRepository
    this._findProductUseCase = findProductUseCase
  }

  // eslint-disable-next-line @typescript-eslint/no-invalid-void-type
  async execute (input: InputDeleteProductDTO): Promise<void | ErrorResponse > {
    const product = await this._findProductUseCase.execute({ Id: input.Id }) as ErrorResponse

    if (!product) {
      const error = new Error(`The product with id '${input.Id}' was not found`)
      error.name = 'NotFoundError'
      throw error
    }
    await this._productRepository.delete(input.Id)
  }
}
