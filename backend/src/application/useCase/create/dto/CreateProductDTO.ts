export interface InputCreateProductDTO {
  Name: string
  Description: string
  Price: number
}

export interface OutputCreateProductDTO {
  Id: string
  Name: string
  Description: string
  Price: number
  CreatedAt: Date
}
