import { isError } from '@birdr/shared'
import { afterAll, describe, expect, it } from '@jest/globals'
import { pino } from 'pino'

import { loggerConfig } from '../../../logger/logging.configuration'
import { dbInstance } from '../../client'
import { approvePosting } from '../approve-posting'
import { createPosting } from '../create-posting'
import { readPostings } from '../read-postings'

describe('read-postings dao', () => {
  const logger = pino(loggerConfig)

  afterAll(async () => {
    await dbInstance.destroy()
  })

  it('returns a list of postings', async () => {
    const userId = 1
    const firstPosting = await createPosting(logger, userId, 'my first posting')
    if(isError(firstPosting)) {
      throw new Error('Failed to insert first posting')
    }
    await approvePosting(logger, firstPosting.id)
    const secondPosting = await createPosting(logger, userId, 'my second posting')
    if(isError(secondPosting)) {
      throw new Error('Failed to insert second posting')
    }
    await approvePosting(logger, secondPosting.id)

    const postings = await readPostings(logger, 2, 0)

    expect(postings).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: firstPosting.id,
        }),
        expect.objectContaining({
          id: secondPosting.id,
        }),
      ]),
    )
  })

})
