export class DomainExceptionValidation extends Error {
  constructor (message: string) {
    super(message)
    this.name = 'DomainExceptionValidation'
  }

  static When (hasError: boolean, error: string): void {
    if (hasError) {
      throw new DomainExceptionValidation(error)
    }
  }
}
