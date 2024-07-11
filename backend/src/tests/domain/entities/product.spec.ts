import Product from '@/domain/entities/Product'

describe('Product Entity', () => {
  it('should create a product with valid parameters', () => {
    // Arrange
    const name = 'notebook'
    const description = 'a great notebook'
    const price = 4500

    // Act
    const product = new Product(name, description, price)

    // Assert
    expect(product.Id).toBeDefined()
    expect(product.Name).toBe(name)
    expect(product.Description).toBe(description)
    expect(product.Price).toBe(price)
    expect(product.CreatedAt).toBeDefined()
    expect(product.UpdatedAt).toBeDefined()
  })
})
