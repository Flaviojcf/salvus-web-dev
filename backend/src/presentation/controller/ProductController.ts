import { type Request, type Response } from 'express'
import type CreateProductUseCase from '@/application/useCase/create/CreateProductUseCase'
import { type InputCreateProductDTO } from '@/application/useCase/create/dto/CreateProductDTO'
import type FindProductUseCase from '@/application/useCase/find/FindProductUseCase'
import type DeleteProductUseCase from '@/application/useCase/delete/DeleteProductUseCase'
import type ListProductUseCase from '@/application/useCase/list/ListProductUseCase'
import { CreateProductValidator } from '../validations/CreateProductValidator'
import type UpdateProductUseCase from '@/application/useCase/update/UpdateProductUseCase'
import type InputUpdateProductDTO from '@/application/useCase/update/dto/UpdateProductDTO'
import { UpdateProductValidator } from '../validations/UpdateProductValidator'

export default class ProductController {
  constructor (private readonly createProductUseCase: CreateProductUseCase,
    private readonly findProductUseCase: FindProductUseCase,
    private readonly deleteProductUseCase: DeleteProductUseCase,
    private readonly listProductUseCase: ListProductUseCase,
    private readonly updateProductUseCase: UpdateProductUseCase
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
    try {
      const result = await this.findProductUseCase.execute({ Id: id })

      return response.status(200).json(result)
    } catch (err) {
      if (err.name === 'NotFoundError') {
        return response.status(404).json({
          title: 'One or more validation errors occurred.',
          status: 404,
          errors: [
            {
              message: err.message
            }
          ]
        })
      } else {
        return response.status(500).json({
          title: 'Internal Server Error.',
          status: 500,
          errors: [
            {
              message: 'Internal Server Error'
            }
          ]
        })
      }
    }
  }

  async delete (request: Request, response: Response): Promise<Response> {
    const { id } = request.params
    try {
      const result = await this.deleteProductUseCase.execute({ Id: id })

      return response.status(204).json(result)
    } catch (err) {
      if (err.name === 'NotFoundError') {
        return response.status(404).json({
          title: 'One or more validation errors occurred.',
          status: 404,
          errors: [
            {
              message: err.message
            }
          ]
        })
      } else {
        return response.status(500).json({
          title: 'Internal Server Error.',
          status: 500,
          errors: [
            {
              message: 'Internal Server Error'
            }
          ]
        })
      }
    }
  }

  async list (request: Request, response: Response): Promise<Response> {
    const result = await this.listProductUseCase.execute()

    return response.status(200).json(result)
  }

  async update (request: Request, response: Response): Promise<Response> {
    const { id } = request.params
    const { Id, Name, Description, Price } = request.body as InputUpdateProductDTO

    try {
      const validationErrors = UpdateProductValidator.validate({ id, Id, Name, Description, Price })

      if (validationErrors.length > 0) {
        UpdateProductValidator.listErrors(validationErrors, response)

        return
      }

      await this.updateProductUseCase.execute({
        Id,
        Name,
        Description,
        Price
      })

      return response.status(204).send()
    } catch (err) {
      if (err.name === 'NotFoundError') {
        return response.status(404).json({
          title: 'One or more validation errors occurred.',
          status: 404,
          errors: [
            {
              message: err.message
            }
          ]
        })
      } else {
        return response.status(500).json({
          title: 'Internal Server Error.',
          status: 500,
          errors: [
            {
              message: 'Internal Server Error'
            }
          ]
        })
      }
    }
  }
}
