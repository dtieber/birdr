import { isError } from '@birdr/shared'
import { afterAll, describe, expect, it } from '@jest/globals'
import { pino } from 'pino'

import { loggerConfig } from '../../../logger/logging.configuration'
import { dbInstance } from '../../client'
import { addPosting } from '../add-posting'
import { addUser } from '../add-user'

describe('add-posting dao', () => {
  const logger = pino(loggerConfig)

  afterAll(async () => {
    await dbInstance.destroy()
  })

  it('returns id after inserting new posting', async () => {
    const user = await addUser(logger, `my-username-${Date.now()}`)
    if(isError(user)) {
      throw new Error('Failed to insert user')
    }
    const postingText = 'hello world'

    const posting = await addPosting(logger, user.id, postingText)

    expect(posting).toMatchObject({
      username: user.username,
      text: postingText,
      approved: false,
    })
  })

})
