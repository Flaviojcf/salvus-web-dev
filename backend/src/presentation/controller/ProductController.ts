import { type Request, type Response } from 'express'
import type CreateProductUseCase from '@/application/useCase/create/CreateProductUseCase'
import { type InputCreateProductDTO } from '@/application/useCase/create/dto/CreateProductDTO'
import { ProductValidator } from '../validations/create/validation'

export default class ProductController {
  constructor (private readonly createProductUseCase: CreateProductUseCase) {}

  async create (request: Request, response: Response): Promise<Response> {
    const { Name, Description, Price } = request.body as InputCreateProductDTO

    const validationErrors = ProductValidator.validateInput({ Name, Description, Price })

    if (validationErrors.length > 0) {
      ProductValidator.listErrors(validationErrors, response)

      return
    }

    const result = await this.createProductUseCase.execute({ Name, Description, Price })

    return response.status(201).send(result)
  }
}
