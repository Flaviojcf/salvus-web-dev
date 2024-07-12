export interface OutPutProduct {
  Id: string
  Name: string
  Description: string
  Price: number
  CreatedAt: Date
}

export interface InputUpdateProduct {
  Id: string
  Name: string
  Description: string
  Price: number
}

export interface InputCreateProduct {
  Id: string
  Name: string
  Description: string
  Price: number
  CreatedAt: Date
}
export default interface IProductRepository {
  create: (product: InputCreateProduct) => Promise<void>
  update: (product: InputUpdateProduct) => Promise<void>
  find: (id: string) => Promise<OutPutProduct>
  list: () => Promise<OutPutProduct[]>
  delete: (id: string) => Promise<void>
}
