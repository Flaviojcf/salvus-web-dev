import type IProductRepository from '@/domain/repositories/IProductRepository'
import type InputUpdateProductDTO from './dto/UpdateProductDTO'
import type FindProductUseCase from '../find/FindProductUseCase'
import { type OutputFindProductDTO } from '../find/dto/FindProductDTO'

export default class UpdateProductUseCase {
  private readonly _productRepository: IProductRepository
  private readonly _findProductUseCase: FindProductUseCase

  constructor (productRepository: IProductRepository, findProductUseCase: FindProductUseCase) {
    this._productRepository = productRepository
    this._findProductUseCase = findProductUseCase
  }

  async execute (input: InputUpdateProductDTO): Promise<void> {
    await this._findProductUseCase.execute({ Id: input.Id })

    await this._productRepository.update(input)
  }
}
