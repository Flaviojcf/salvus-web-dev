import ListProductUseCase from '@/application/useCase/list/ListProductUseCase'
import { type OutPutListProductDTO } from '@/application/useCase/list/dto/ListProductDTO'
import type IProductRepository from '@/domain/repositories/IProductRepository'

describe('List Products Use Case', () => {
  let sut: ListProductUseCase
  let mockProductRepository: IProductRepository

  beforeEach(() => {
    mockProductRepository = { findAll: jest.fn().mockResolvedValue(null) } as unknown as IProductRepository

    sut = new ListProductUseCase(mockProductRepository)
  })

  it('should list all products', async () => {
    const fixedDate = new Date('2024-07-11T00:00:00Z')

    const mockProducts: OutPutListProductDTO[] = [
      {
        Id: 'product-id-1',
        Name: 'Product 1',
        Description: 'Description of Product 1',
        Price: 1000,
        CreatedAt: fixedDate
      },
      {
        Id: 'product-id-2',
        Name: 'Product 2',
        Description: 'Description of Product 2',
        Price: 1500,
        CreatedAt: fixedDate
      }
    ]
    jest.spyOn(mockProductRepository, 'findAll').mockResolvedValueOnce(mockProducts)

    const result = await sut.execute()

    expect(mockProductRepository.findAll).toHaveBeenCalled()
    expect(result).toEqual(mockProducts)
  })
})
