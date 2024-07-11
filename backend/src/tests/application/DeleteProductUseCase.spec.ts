import DeleteProductUseCase from '@/application/useCase/delete/DeleteProductUseCase'
import type IProductRepository from '@/domain/repositories/IProductRepository'
import type InputDeleteProductDTO from '@/application/useCase/delete/dto/DeleteProductDTO'

describe('Delete Product Use Case', () => {
  let sut: DeleteProductUseCase
  let mockProductRepository: IProductRepository

  beforeEach(() => {
    mockProductRepository = { delete: jest.fn().mockResolvedValue(null) } as unknown as IProductRepository

    sut = new DeleteProductUseCase(mockProductRepository)
  })

  it('should delete a product', async () => {
    const input: InputDeleteProductDTO = {
      Id: 'product-id-to-delete'
    }

    jest.spyOn(mockProductRepository, 'delete').mockResolvedValueOnce()

    await sut.execute(input)

    expect(mockProductRepository.delete).toHaveBeenCalledWith(input.Id)
  })
})
