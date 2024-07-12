import type IProductRepository from '@/domain/repositories/IProductRepository'
import { type OutputFindProductDTO, type InputFindProductDTO } from './dto/FindProductDTO'
import { type ErrorResponse } from '@/presentation/interfaces/ErrorResponse'

export default class FindProductUseCase {
  private readonly _productRepository: IProductRepository

  constructor (productRepository: IProductRepository) {
    this._productRepository = productRepository
  }

  async execute (input: InputFindProductDTO): Promise<OutputFindProductDTO | ErrorResponse> {
    const product = await this._productRepository.find(input.Id)

    if (!product) {
      const error = new Error(`The product with id '${input.Id}' was not found`)
      error.name = 'NotFoundError'
      throw error
    }

    const outputFindProductDTO: OutputFindProductDTO = {
      Id: product.Id,
      Name: product.Name,
      Description: product.Description,
      CreatedAt: product.CreatedAt,
      Price: product.Price
    }

    return outputFindProductDTO
  }
}
