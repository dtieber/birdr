import { isError } from '@birdr/shared'
import { afterAll, describe, expect, it } from '@jest/globals'
import { pino } from 'pino'

import { loggerConfig } from '../../../logger/logging.configuration'
import { dbInstance } from '../../client'
import { createUser } from '../create-user'
import { readUserById } from '../read-user-by-id'

describe('read-user-by-id dao', () => {
  const logger = pino(loggerConfig)

  afterAll(async () => {
    await dbInstance.destroy()
  })

  it('returns user', async () => {
    const username = `my-username-${Date.now()}`
    const user = await createUser(logger, dbInstance, username)
    if(isError(user)) {
      throw new Error('Failed to insert user')
    }

    const foundUser = await readUserById(logger, dbInstance, user.id)

    expect(foundUser).toMatchObject({
      id: user.id,
      username,
    })
  })

})
