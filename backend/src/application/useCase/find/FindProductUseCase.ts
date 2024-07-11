import type IProductRepository from '@/domain/repositories/IProductRepository'
import { type OutputFindProductDTO, type InputFindProductDTO } from './dto/FindProductDTO'

export default class FindProductUseCase {
  private readonly _productRepository: IProductRepository

  constructor (productRepository: IProductRepository) {
    this._productRepository = productRepository
  }

  async execute (input: InputFindProductDTO): Promise<OutputFindProductDTO> {
    const product = await this._productRepository.find(input.Id)

    const outputFindProductDTO: OutputFindProductDTO = {
      Id: product.id,
      Name: product.name,
      Description: product.description,
      CreatedAt: product.createdAt,
      Price: product.price
    }

    return outputFindProductDTO
  }
}
