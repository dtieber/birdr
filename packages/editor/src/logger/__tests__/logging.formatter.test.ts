import { describe, expect, it, jest } from '@jest/globals'

import { logLevelFormatter, timestampFormatter } from '../logging.formatter'

describe('logging.formatter', () => {
  it('logLevelFormatter uses label for level', () => {
    const formatted = logLevelFormatter('INFO', 0)

    expect(formatted).toEqual({
      level: 'INFO',
    })
  })

  it('timestampFormatter creates iso string', () => {
    Date.now = jest.fn(() => new Date(Date.UTC(2222, 0, 1)).valueOf())

    const formatted = timestampFormatter()

    expect(formatted).toEqual(',"time":"2222-01-01T00:00:00.000Z"')
  })
})
