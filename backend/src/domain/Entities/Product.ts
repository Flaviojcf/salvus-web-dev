import { DomainExceptionValidation } from '@/domain/validations/DomainExceptionValidation'
import BaseEntity from './BaseEntity'

export default class Product extends BaseEntity {
  public readonly Name: string
  public readonly Description: string
  public readonly Price: number
  public readonly CreatedAt: Date
  public readonly UpdatedAt: Date

  constructor (name: string, description: string, price: number) {
    Product.ValidateDomain(name, description, price)
    super()
    this.Name = name
    this.Description = description
    this.Price = price
    this.CreatedAt = new Date()
    this.UpdatedAt = new Date()
  }

  private static ValidateDomain (name: string, description: string, price: number): void {
    DomainExceptionValidation.When(!name.trim(), 'Name should not be empty')
    DomainExceptionValidation.When(!description.trim(), 'Description should not be empty')
    DomainExceptionValidation.When(price <= 0, 'Price should be greater than zero')
  }
}
