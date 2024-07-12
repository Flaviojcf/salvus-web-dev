import type Product from '@/domain/entities/Product'

export interface OutPutProduct {
  Id: string
  Name: string
  Description: string
  Price: number
  CreatedAt: Date
}
export default interface IProductRepository {
  create: (product: Product) => Promise<void>
  update: (product: Product) => Promise<void>
  find: (id: string) => Promise<OutPutProduct>
  findAll: () => Promise<OutPutProduct[]>
  delete: (id: string) => Promise<void>
}
