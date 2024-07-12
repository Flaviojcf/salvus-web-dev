import type Product from '@/domain/entities/Product'
import type IProductRepository from '@/domain/repositories/IProductRepository'
import { prisma } from '../prisma'
import { type OutPutProduct } from '@/domain/repositories/IProductRepository'

export default class ProductRepository implements IProductRepository {
  async create (entity: Product): Promise<void> {
    await prisma.product.create({
      data: {
        id: entity.id,
        name: entity.name,
        description: entity.description,
        price: entity.price,
        createdAt: entity.createdAt
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

  update: (product: Product) => Promise<void>

  findAll: () => Promise<OutPutProduct[]>
}
