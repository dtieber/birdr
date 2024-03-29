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
    const userId = '1'
    const firstPosting = await createPosting(logger, dbInstance, userId, 'my first posting')
    if(isError(firstPosting)) {
      throw new Error('Failed to insert first posting')
    }
    await approvePosting(logger, dbInstance, firstPosting.id)
    const secondPosting = await createPosting(logger, dbInstance, userId, 'my second posting')
    if(isError(secondPosting)) {
      throw new Error('Failed to insert second posting')
    }
    await approvePosting(logger, dbInstance, secondPosting.id)

    const postings = await readPostings(logger, dbInstance, 2, 0)

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
