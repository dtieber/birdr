import { isError } from '@birdr/shared'
import { afterAll, describe, expect, it } from '@jest/globals'
import { pino } from 'pino'

import { loggerConfig } from '../../../logger/logging.configuration'
import { dbInstance } from '../../client'
import { createPosting } from '../create-posting'
import { readPostingById } from '../read-posting-by-id'

describe('read-posting-by-id dao', () => {
  const logger = pino(loggerConfig)

  afterAll(async () => {
    await dbInstance.destroy()
  })

  it('returns posting', async () => {
    const userId = 1
    const postingText = 'hello world'
    const posting = await createPosting(logger, userId, postingText)
    if(isError(posting)) {
      throw new Error('Failed to insert posting')
    }

    const foundPosting = await readPostingById(logger, posting.id)

    expect(foundPosting).toMatchObject({
      text: postingText,
      approved: false,
      author: userId,
    })
  })

})
