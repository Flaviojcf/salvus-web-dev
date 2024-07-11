import CreateProductUseCase from '@/application/useCase/create/CreateProductUseCase'
import { type InputCreateProductDTO } from '@/application/useCase/create/dto/CreateProductDTO'
import type IProductRepository from '@/domain/repositories/IProductRepository'

describe('Create Product Use Case', () => {
  let sut: CreateProductUseCase
  let mockProductRepository: IProductRepository

  beforeEach(() => {
    mockProductRepository = { create: jest.fn().mockResolvedValue(null) } as unknown as IProductRepository

    sut = new CreateProductUseCase(mockProductRepository)
  })

  it('should create a new product with valid parameters', async () => {
    const input: InputCreateProductDTO = {
      Name: 'Notebook',
      Description: 'Notebook description',
      Price: 4500
    }

    jest.spyOn(mockProductRepository, 'create').mockResolvedValueOnce()

    const result = await sut.execute(input)

    expect(mockProductRepository.create).toHaveBeenCalledWith(result)
  })
})
