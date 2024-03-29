import { afterAll, describe, expect, it } from '@jest/globals'
import { pino } from 'pino'

import { loggerConfig } from '../../../logger/logging.configuration'
import { dbInstance } from '../../client'
import { createPosting } from '../create-posting'

describe('create-posting dao', () => {
  const logger = pino(loggerConfig)

  afterAll(async () => {
    await dbInstance.destroy()
  })

  it('returns id after inserting new posting', async () => {
    const postingText = 'hello world'
    const userId = 1

    const posting = await createPosting(logger, userId, postingText)

    expect(posting).toMatchObject({
      author: userId,
      text: postingText,
      approved: false,
    })
  })

})
