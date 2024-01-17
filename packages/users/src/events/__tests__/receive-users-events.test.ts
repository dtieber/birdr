import type { UserEvent } from '@birdr/events'
import { usersTopic } from '@birdr/events'
import { describe, expect, it, jest } from '@jest/globals'
import type { Consumer } from 'kafkajs'
import { pino } from 'pino'

import { loggerConfig } from '../../logger/logging.configuration'
import { receiveUsersEvents } from '../receive-users-events'

describe('receive-users-events', () => {
  const logger = pino(loggerConfig)
  const mockSubscribe = jest.fn()
  const mockRun = jest.fn()
  const mockConsumer = {
    subscribe: mockSubscribe,
    run: mockRun,
  } as unknown as Consumer

  it('subscribes to [users] events', async() => {
    const mockListener = jest.fn() as (key: string, event: UserEvent) => Promise<void>

    await receiveUsersEvents(logger, mockConsumer, mockListener)

    expect(mockSubscribe).toHaveBeenCalledWith({ topic: usersTopic })
  })

})
