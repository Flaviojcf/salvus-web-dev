import type IProductRepository from '@/domain/repositories/IProductRepository'
import type InputDeleteProductDTO from './dto/DeleteProductDTO'

export default class DeleteProductUseCase {
  private readonly _productRepository: IProductRepository

  constructor (productRepository: IProductRepository) {
    this._productRepository = productRepository
  }

  async execute (input: InputDeleteProductDTO): Promise<void> {
    await this._productRepository.delete(input.Id)
  }
}
