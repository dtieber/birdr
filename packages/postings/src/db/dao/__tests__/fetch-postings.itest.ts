import { isError } from '@birdr/shared'
import { afterAll, describe, expect, it } from '@jest/globals'
import { pino } from 'pino'

import { loggerConfig } from '../../../logger/logging.configuration'
import { dbInstance } from '../../client'
import { addPosting } from '../add-posting'
import { addUser } from '../add-user'
import { approvePosting } from '../approve-posting'
import { fetchPostings } from '../fetch-postings'

describe('postings dao', () => {
  const logger = pino(loggerConfig)

  afterAll(async () => {
    await dbInstance.destroy()
  })

  it('returns a list of postings', async () => {
    const user = await addUser(logger, `my-username-${Date.now()}`)
    if(isError(user)) {
      throw new Error('Failed to insert user')
    }
    const firstPosting = await addPosting(logger, user.id, 'my first posting')
    if(isError(firstPosting)) {
      throw new Error('Failed to insert first posting')
    }
    await approvePosting(logger, firstPosting.id)
    const secondPosting = await addPosting(logger, user.id, 'my second posting')
    if(isError(secondPosting)) {
      throw new Error('Failed to insert second posting')
    }
    await approvePosting(logger, secondPosting.id)

    const postings = await fetchPostings(logger, 2, 0)

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
