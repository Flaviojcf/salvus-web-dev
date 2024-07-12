import type Product from '@/domain/entities/Product'

export interface OutPutProduct {
  Id: string
  Name: string
  Description: string
  Price: number
  CreatedAt: Date
}

export interface InputProduct {
  Id: string
  Name: string
  Description: string
  Price: number
}
export default interface IProductRepository {
  create: (product: Product) => Promise<void>
  update: (product: InputProduct) => Promise<void>
  find: (id: string) => Promise<OutPutProduct>
  list: () => Promise<OutPutProduct[]>
  delete: (id: string) => Promise<void>
}
