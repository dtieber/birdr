import { afterAll, describe, expect, it } from '@jest/globals'
import { pino } from 'pino'

import { loggerConfig } from '../../../logger/logging.configuration'
import { dbInstance } from '../../client'
import { addUser } from '../add-user'

describe('add-user dao', () => {
  const logger = pino(loggerConfig)

  afterAll(async () => {
    await dbInstance.destroy()
  })

  it('returns id after inserting new user', async () => {
    const username = `my-username-${Date.now()}`
    const user = await addUser(logger, username)

    expect(user).toMatchObject({
      username,
    })
  })

})
