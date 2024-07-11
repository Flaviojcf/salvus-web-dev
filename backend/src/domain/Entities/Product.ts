import BaseEntity from './BaseEntity'

export default class Product extends BaseEntity {
  public readonly Name: string
  public readonly Description: string
  public readonly Price: number
  public readonly CreatedAt: Date
  public readonly UpdatedAt: Date

  constructor (name: string, description: string, price: number) {
    super()
    this.Name = name
    this.Description = description
    this.Price = price
    this.CreatedAt = new Date()
    this.UpdatedAt = new Date()
  }
}
