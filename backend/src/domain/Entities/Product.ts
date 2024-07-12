import { DomainExceptionValidation } from '@/domain/validations/DomainExceptionValidation'
import BaseEntity from './BaseEntity'

export default class Product extends BaseEntity {
  private Name: string
  private Description: string
  private Price: number
  private CreatedAt: Date

  constructor (name: string, description: string, price: number) {
    Product.validateDomain(name, description, price)
    super()
    this.Name = name
    this.Description = description
    this.Price = price
    this.CreatedAt = new Date()
  }

  get name (): string {
    return this.Name
  }

  private set name (value: string) {
    this.Name = value
  }

  get description (): string {
    return this.Description
  }

  private set description (value: string) {
    this.Description = value
  }

  get price (): number {
    return this.Price
  }

  private set price (value: number) {
    this.Price = value
  }

  get createdAt (): Date {
    return this.CreatedAt
  }

  private set createdAt (value: Date) {
    this.CreatedAt = value
  }

  private static validateDomain (name: string, description: string, price: number): void {
    DomainExceptionValidation.When(!name.trim(), 'Name should not be empty')
    DomainExceptionValidation.When(!description.trim(), 'Description should not be empty')
    DomainExceptionValidation.When(price <= 0, 'Price should be greater than zero')
  }
}
