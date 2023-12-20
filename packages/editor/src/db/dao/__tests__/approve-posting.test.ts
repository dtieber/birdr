import { afterAll, describe, expect, it } from '@jest/globals'
import { pino } from 'pino'

import { isError } from '../../../errors/is-error.util'
import { loggerConfig } from '../../../logger/logging.configuration'
import { dbInstance } from '../../client'
import { addPosting } from '../add-posting'
import { addUser } from '../add-user'
import { approvePosting } from '../approve-posting'

describe('approve-posting dao', () => {
  const logger = pino(loggerConfig)

  afterAll(async () => {
    await dbInstance.destroy()
  })

  it('sets posting to approved', async () => {
    const user = await addUser(logger, `my-username-${Date.now()}`)
    if(isError(user)) {
      throw new Error('Failed to insert user')
    }
    const posting = await addPosting(logger, user.id, 'hello world')
    if(isError(posting)) {
      throw new Error('Failed to insert posting')
    }

    const approvedPosting = await approvePosting(logger, posting.id)

    expect(approvedPosting).toMatchObject({
      approved: true,
    })
  })

})
