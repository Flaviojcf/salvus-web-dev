import type IProductRepository from '@/domain/repositories/IProductRepository'
import { type OutPutListProductDTO } from './dto/ListProductDTO'

export default class ListProductUseCase {
  private readonly _productRepository: IProductRepository

  constructor (productRepository: IProductRepository) {
    this._productRepository = productRepository
  }

  async execute (): Promise<OutPutListProductDTO[]> {
    return await this._productRepository.findAll()
  }
}
