import { afterAll, describe, expect, it } from '@jest/globals'
import { pino } from 'pino'

import { isError } from '../../../errors/is-error.util'
import { loggerConfig } from '../../../logger/logging.configuration'
import { dbInstance } from '../../client'
import { addUser } from '../add-user'
import { findUserById } from '../find-user-by-id'

describe('find-user-by-id dao', () => {
  const logger = pino(loggerConfig)

  afterAll(async () => {
    await dbInstance.destroy()
  })

  it('returns user', async () => {
    const username = `my-username-${Date.now()}`
    const user = await addUser(logger, username)
    if(isError(user)) {
      throw new Error('Failed to insert user')
    }

    const foundUser = await findUserById(logger, user.id)

    expect(foundUser).toMatchObject({
      id: user.id,
      username,
    })
  })

})
