import type IProductRepository from '@/domain/repositories/IProductRepository'
import { prisma } from '../prisma'
import { type InputUpdateProduct, type InputCreateProduct, type OutPutProduct } from '@/domain/repositories/IProductRepository'

export default class ProductRepository implements IProductRepository {
  async create (entity: InputCreateProduct): Promise<void> {
    await prisma.product.create({
      data: {
        id: entity.Id,
        name: entity.Name,
        description: entity.Description,
        price: entity.Price,
        createdAt: entity.CreatedAt
      }
    })
  }

  async find (id: string): Promise<OutPutProduct | null> {
    const product = await prisma.product.findUnique({
      where: {
        id
      }
    })

    if (!product) return

    return {
      Id: product.id,
      Name: product.name,
      Description: product.description,
      Price: product.price,
      CreatedAt: product.createdAt

    }
  }

  async delete (id: string): Promise<void> {
    await prisma.product.delete({
      where: {
        id
      }
    })
  }

  async list (): Promise<OutPutProduct[]> {
    const products = await prisma.product.findMany()

    return products.map((product) => ({
      Id: product.id,
      Name: product.name,
      Description: product.description,
      Price: product.price,
      CreatedAt: product.createdAt
    }))
  }

  async update (product: InputUpdateProduct): Promise<void> {
    await prisma.product.update({
      where: {
        id: product.Id
      },
      data: {
        name: product.Name,
        description: product.Description,
        price: product.Price
      }
    })
  }
}
