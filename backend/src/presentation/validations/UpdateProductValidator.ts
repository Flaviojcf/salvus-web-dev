import { type Response } from 'express'
import { z } from 'zod'
const ProductSchema = z.object({
  id: z.string().min(1, 'id is required and must be a non-empty string.'),
  Id: z.string().min(1, 'Id is required and must be a non-empty string.'),
  Name: z.string().min(1, 'Name is required and must be a non-empty string.'),
  Description: z.string().min(1, 'Description is required and must be a non-empty string.'),
  Price: z.number().positive('Price is required and must be a positive number.')
}).refine((data) => data.id === data.Id, {
  message: 'id from params and Id from body must be the same',
  path: ['Id']
})
type IProductSchema = z.infer<typeof ProductSchema>

export class UpdateProductValidator {
  static validate (data: IProductSchema): string[] {
    const errors: string[] = []

    try {
      ProductSchema.parse(data)
    } catch (error) {
      if (error instanceof z.ZodError) {
        error.errors.forEach(err => {
          if (err.message === 'Required') {
            errors.push(`${err.path.join('.')} is required`)
          } else {
            errors.push(err.message)
          }
        })
      } else {
        errors.push('Invalid input data.')
      }
    }

    return errors
  }

  static listErrors (validationErrors: string[], response: Response): object {
    if (validationErrors.length > 0) {
      return response.status(400).json({
        title: 'One or more validation errors occurred.',
        status: 400,
        errors: validationErrors.map(error => ({
          message: error
        }))
      })
    }
  }
}
