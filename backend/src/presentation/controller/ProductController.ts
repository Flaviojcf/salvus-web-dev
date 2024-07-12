import { type Request, type Response } from 'express'
import type CreateProductUseCase from '@/application/useCase/create/CreateProductUseCase'
import { type InputCreateProductDTO } from '@/application/useCase/create/dto/CreateProductDTO'

export default class ProductController {
  constructor (private readonly createProductUseCase: CreateProductUseCase) {}

  async create (request: Request, response: Response): Promise<Response> {
    const { Name, Description, Price } = request.body as InputCreateProductDTO

    const result = await this.createProductUseCase.execute({ Name, Description, Price })

    return response.status(201).send(result)
  }
}
