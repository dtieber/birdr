import { afterAll, describe, expect, it } from '@jest/globals'
import { pino } from 'pino'

import { loggerConfig } from '../../../logger/logging.configuration'
import { dbInstance } from '../../client'
import { findUserById } from '../find-user-by-id'

describe('find-user-by-id dao', () => {
  const logger = pino(loggerConfig)

  afterAll(async () => {
    await dbInstance.destroy()
  })

  it('returns error if user is not found', async () => {
    const foundUser = await findUserById(logger, 666)

    expect(foundUser).toMatchObject({ message:'User with id 666 not found' })
  })

})
