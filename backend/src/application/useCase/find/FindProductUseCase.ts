import type IProductRepository from '@/domain/repositories/IProductRepository'
import { type OutputFindProductDTO, type InputFindProductDTO } from './dto/FindProductDTO'

export default class FindProductUseCase {
  private readonly _productRepository: IProductRepository

  constructor (productRepository: IProductRepository) {
    this._productRepository = productRepository
  }

  async execute (input: InputFindProductDTO): Promise<OutputFindProductDTO | object> {
    try {
      const product = await this._productRepository.find(input.Id)

      const outputFindProductDTO: OutputFindProductDTO = {
        Id: product.Id,
        Name: product.Name,
        Description: product.Description,
        CreatedAt: product.CreatedAt,
        Price: product.Price
      }

      return outputFindProductDTO
    } catch (err) {
      return {
        title: 'One or more validation errors occurred.',
        status: 404,
        errors: [
          {
            message: `The product with id '${input.Id}' was not found`
          }
        ]
      }
    }
  }
}
