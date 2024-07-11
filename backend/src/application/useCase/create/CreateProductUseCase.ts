import type IProductRepository from '@/domain/repositories/IProductRepository'
import { type OutputCreateProductDTO, type InputCreateProductDTO } from './dto/CreateProductDTO'
import Product from '@/domain/entities/Product'

export default class CreateProductUseCase {
  private readonly _productRepository: IProductRepository

  constructor (productRepository: IProductRepository) {
    this._productRepository = productRepository
  }

  async execute (input: InputCreateProductDTO): Promise<OutputCreateProductDTO> {
    const product = new Product(input.Name, input.Description, input.Price)

    await this._productRepository.create(product)

    const outputProduct: OutputCreateProductDTO = {
      Id: product.id,
      Name: product.name,
      Description: product.description,
      CreatedAt: product.createdAt,
      Price: product.price
    }

    return outputProduct
  }
}
