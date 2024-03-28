import type { Failure } from './failure'

export const isFailure = (given: unknown): given is Failure => {
  const maybeError = given as Failure
  return maybeError.name !== undefined
    && maybeError.message !== undefined
    && maybeError.code !== undefined
}
