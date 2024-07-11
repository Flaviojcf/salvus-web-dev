import { randomUUID } from 'crypto'

export default abstract class BaseEntity {
  private readonly Id: string = randomUUID()

  get id (): string {
    return this.Id
  }
}
