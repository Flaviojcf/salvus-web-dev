import Product from '../../../domain/Entities/Product'
import { DomainExceptionValidation } from '@/domain/validations/DomainExceptionValidation'

describe('Product Entity', () => {
  it('should create a product with valid parameters', () => {
    // Arrange
    const name = 'notebook'
    const description = 'a great notebook'
    const price = 4500

    // Act
    const product = new Product(name, description, price)

    // Assert
    expect(product.id).toBeDefined()
    expect(product.name).toBe(name)
    expect(product.description).toBe(description)
    expect(product.price).toBe(price)
    expect(product.createdAt).toBeDefined()
  })

  it('should not be able to create a product without name', () => {
    try {
      // Arrange
      const name = ''
      const description = 'a great notebook'
      const price = 4500

      // Act
      const product = new Product(name, description, price)
      expect(true).toBeFalsy()
    } catch (error) {
      expect(error).toBeInstanceOf(DomainExceptionValidation)
      expect(error.message).toBe('Name should not be empty')
    }
  })

  it('should not be able to create a product without description', () => {
    try {
      // Arrange
      const name = 'notebook'
      const description = ''
      const price = 4500

      // Act
      const product = new Product(name, description, price)
      expect(true).toBeFalsy()
    } catch (error) {
      expect(error).toBeInstanceOf(DomainExceptionValidation)
      expect(error.message).toBe('Description should not be empty')
    }
  })
  it('should not be able to create a product without price', () => {
    try {
      // Arrange
      const name = 'notebook'
      const description = 'a great notebook'
      const price = 0

      // Act
      const product = new Product(name, description, price)
      expect(true).toBeFalsy()
    } catch (error) {
      expect(error).toBeInstanceOf(DomainExceptionValidation)
      expect(error.message).toBe('Price should be greater than zero')
    }
  })
})
