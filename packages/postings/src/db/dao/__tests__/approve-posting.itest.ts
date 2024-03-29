import { isError } from '@birdr/shared'
import { afterAll, describe, expect, it } from '@jest/globals'
import { pino } from 'pino'

import { loggerConfig } from '../../../logger/logging.configuration'
import { dbInstance } from '../../client'
import { approvePosting } from '../approve-posting'
import { createPosting } from '../create-posting'

describe('approve-posting dao', () => {
  const logger = pino(loggerConfig)

  afterAll(async () => {
    await dbInstance.destroy()
  })

  it('sets posting to approved', async () => {
    const userId = '1'
    const posting = await createPosting(logger, userId, 'hello world')
    if(isError(posting)) {
      throw new Error('Failed to insert posting')
    }

    const approvedPosting = await approvePosting(logger, posting.id)

    expect(approvedPosting).toMatchObject({
      approved: true,
    })
  })

})
