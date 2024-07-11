import type IProductRepository from '@/domain/repositories/IProductRepository'
import type InputUpdateProductDTO from './dto/UpdateProductDTO'

export default class UpdateProductUseCase {
  private readonly _productRepository: IProductRepository

  constructor (productRepository: IProductRepository) {
    this._productRepository = productRepository
  }

  async execute (input: InputUpdateProductDTO): Promise<void> {
    const product = await this._productRepository.find(input.Id)

    product.update(input.Name, input.Description, input.Price)
    await this._productRepository.update(product)
  }
}
