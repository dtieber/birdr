import { isError } from '@birdr/shared'
import { afterAll, describe, expect, it } from '@jest/globals'
import { pino } from 'pino'

import { loggerConfig } from '../../../logger/logging.configuration'
import { dbInstance } from '../../client'
import { addPosting } from '../add-posting'
import { findPostingById } from '../find-posting-by-id'

describe('find-posting-by-id dao', () => {
  const logger = pino(loggerConfig)

  afterAll(async () => {
    await dbInstance.destroy()
  })

  it('returns posting', async () => {
    const userId = 1
    const postingText = 'hello world'
    const posting = await addPosting(logger, userId, postingText)
    if(isError(posting)) {
      throw new Error('Failed to insert posting')
    }

    const foundPosting = await findPostingById(logger, posting.id)

    expect(foundPosting).toMatchObject({
      text: postingText,
      approved: false,
      author: userId,
    })
  })

})
