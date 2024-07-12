import DeleteProductUseCase from '@/application/useCase/delete/DeleteProductUseCase'
import type IProductRepository from '@/domain/repositories/IProductRepository'
import type InputDeleteProductDTO from '@/application/useCase/delete/dto/DeleteProductDTO'
import type FindProductUseCase from '@/application/useCase/find/FindProductUseCase'

describe('Delete Product Use Case', () => {
  let sut: DeleteProductUseCase
  let mockProductRepository: IProductRepository
  let mockFindProductUseCase: FindProductUseCase

  beforeEach(() => {
    mockProductRepository = { delete: jest.fn().mockResolvedValue(null) } as unknown as IProductRepository
    mockFindProductUseCase = { execute: jest.fn().mockResolvedValue({ Id: 'product-id-to-delete' }) } as unknown as FindProductUseCase

    sut = new DeleteProductUseCase(mockProductRepository, mockFindProductUseCase)
  })

  it('should delete a product', async () => {
    const input: InputDeleteProductDTO = {
      Id: 'product-id-to-delete'
    }

    await sut.execute(input)

    expect(mockProductRepository.delete).toHaveBeenCalledWith('product-id-to-delete')
  })
})
