import { describe, expect, it, jest } from '@jest/globals'

import { timestampFormatter } from '../logging.formatter'

describe('logging.formatter', () => {
  it('timestampFormatter creates iso string', () => {
    Date.now = jest.fn(() => new Date(Date.UTC(2222, 0, 1)).valueOf())

    const formatted = timestampFormatter()

    expect(formatted).toEqual(',"time":"2222-01-01T00:00:00.000Z"')
  })
})
