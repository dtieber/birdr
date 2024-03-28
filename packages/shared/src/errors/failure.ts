export class Failure extends Error {
  code: string

  constructor(message: string, code: string = 'UNSPECIFIED') {
    super(message)
    this.code = code
  }
}
