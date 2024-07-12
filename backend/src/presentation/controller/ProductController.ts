import { type Request, type Response } from 'express'
import type CreateProductUseCase from '@/application/useCase/create/CreateProductUseCase'
import { type InputCreateProductDTO } from '@/application/useCase/create/dto/CreateProductDTO'
import type FindProductUseCase from '@/application/useCase/find/FindProductUseCase'
import { CreateProductValidator } from '../validations/createProductValidator'
import type DeleteProductUseCase from '@/application/useCase/delete/DeleteProductUseCase'

export default class ProductController {
  constructor (private readonly createProductUseCase: CreateProductUseCase,
    private readonly findProductUseCase: FindProductUseCase,
    private readonly deleteProductUseCase: DeleteProductUseCase
  ) {}

  async create (request: Request, response: Response): Promise<Response> {
    const { Name, Description, Price } = request.body as InputCreateProductDTO

    const validationErrors = CreateProductValidator.validate({ Name, Description, Price })

    if (validationErrors.length > 0) {
      CreateProductValidator.listErrors(validationErrors, response)

      return
    }

    const result = await this.createProductUseCase.execute({ Name, Description, Price })

    return response.status(201).send(result)
  }

  async find (request: Request, response: Response): Promise<Response> {
    const { id } = request.params

    const result = await this.findProductUseCase.execute({ Id: id })

    return response.status(200).json(result)
  }

  async delete (request: Request, response: Response): Promise<Response> {
    const { id } = request.params

    const result = await this.deleteProductUseCase.execute({ Id: id })

    return response.status(204).json(result)
  }
}
