import { randomUUID } from 'crypto'

export default abstract class BaseEntity {
  public readonly Id: string = randomUUID()
}
