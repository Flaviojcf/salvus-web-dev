import FindProductUseCase from '@/application/useCase/find/FindProductUseCase'
import { type OutputFindProductDTO, type InputFindProductDTO } from '@/application/useCase/find/dto/FindProductDTO'
import Product from '@/domain/entities/Product'
import type IProductRepository from '@/domain/repositories/IProductRepository'

describe('Find Product Use Case', () => {
  let sut: FindProductUseCase
  let mockProductRepository: IProductRepository

  beforeEach(() => {
    mockProductRepository = { find: jest.fn().mockResolvedValue(null) } as unknown as IProductRepository

    sut = new FindProductUseCase(mockProductRepository)
  })

  it('should find a product', async () => {
    const input: InputFindProductDTO = {
      Id: 'product-id-to-find'
    }

    const foundProduct = new Product('Found Product', 'Description of Found Product', 4500)

    jest.spyOn(mockProductRepository, 'find').mockResolvedValueOnce(foundProduct)

    const result = await sut.execute(input)

    expect(mockProductRepository.find).toHaveBeenCalledWith(input.Id)

    expect(result).toEqual({
      Id: foundProduct.id,
      Name: foundProduct.name,
      Description: foundProduct.description,
      Price: foundProduct.price,
      CreatedAt: foundProduct.createdAt
    })
  })
})
