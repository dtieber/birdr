import { describe, expect, it } from '@jest/globals'

import { Failure } from '../failure'
import { isFailure } from '../is-failure.util'

describe('isFailure type guard', () => {
  it('detects Failure', () => {
    expect(isFailure(new Failure('failed'))).toBe(true)
  })

  it('detects non-failures', () => {
    const nonFailure = {
      id: 1,
      foo: 'bar',
    }

    expect(isFailure(nonFailure)).toBe(false)
  })
})
