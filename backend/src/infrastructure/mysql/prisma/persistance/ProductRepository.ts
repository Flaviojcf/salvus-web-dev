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

  update: (product: Product) => Promise<void>
  find: (id: string) => Promise<Product>
  findAll: () => Promise<OutPutProduct[]>
  delete: (id: string) => Promise<void>
}
