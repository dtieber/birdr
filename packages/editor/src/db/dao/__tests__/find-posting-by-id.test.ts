import { afterAll, describe, expect, it } from '@jest/globals'
import { pino } from 'pino'

import { loggerConfig } from '../../../logger/logging.configuration'
import { dbInstance } from '../../client'
import { findPostingById } from '../find-posting-by-id'

describe('find-posting-by-id dao', () => {
  const logger = pino(loggerConfig)

  afterAll(async () => {
    await dbInstance.destroy()
  })

  it('returns error if posting cannot be found', async () => {
    const foundPosting = await findPostingById(logger, 666)

    expect(foundPosting).toMatchObject({ message:'Posting with id 666 not found' })
  })

})
