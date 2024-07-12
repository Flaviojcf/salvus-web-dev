import type IProductRepository from '@/domain/repositories/IProductRepository'
import { type OutputCreateProductDTO, type InputCreateProductDTO } from './dto/CreateProductDTO'

import { type InputCreateProduct } from '@/domain/repositories/IProductRepository'
import Product from '../../../domain/Entities/Product'

export default class CreateProductUseCase {
  private readonly _productRepository: IProductRepository

  constructor (productRepository: IProductRepository) {
    this._productRepository = productRepository
  }

  async execute (input: InputCreateProductDTO): Promise<OutputCreateProductDTO> {
    const product = new Product(input.Name, input.Description, input.Price)

    const inputCreateProduct: InputCreateProduct = {
      Id: product.id,
      Name: product.name,
      Description: product.description,
      Price: product.price,
      CreatedAt: product.createdAt
    }

    await this._productRepository.create(inputCreateProduct)

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
