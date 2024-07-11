import { randomUUID } from 'crypto'

export default abstract class BaseEntity {
  private readonly id: string = randomUUID()
}
