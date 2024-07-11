import BaseEntity from './BaseEntity'

export default class Product extends BaseEntity {
  private readonly Name: string
  private readonly Description: string
  private readonly Price: number
  private readonly CreatedAt: Date
  private readonly UpdatedAt: Date

  constructor (name: string, description: string, price: number, createdAt: Date, updatedAt: Date) {
    super()
    this.Name = name
    this.Description = description
    this.Price = price
    this.CreatedAt = createdAt
    this.UpdatedAt = updatedAt
  }
}
