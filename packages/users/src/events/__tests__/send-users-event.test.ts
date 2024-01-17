import type { UserCreatedEvent } from '@birdr/events'
import { UserActions, usersTopic } from '@birdr/events'
import { describe, expect, it, jest } from '@jest/globals'
import type { Producer } from 'kafkajs'
import { pino } from 'pino'

import { loggerConfig } from '../../logger/logging.configuration'
import { sendUsersEvent } from '../send-users-event'

describe('send-users-event', () => {
  const anyUUID = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/
  const logger = pino(loggerConfig)
  const mockSend = jest.fn()
  const mockProducer = {
    send: mockSend,
  } as unknown as Producer

  it('sends a [users] event and returns uuid if successful', async() => {
    mockSend.mockReturnValueOnce([
      { errorCode: 0 },
    ])
    const event: UserCreatedEvent = {
      action: UserActions.USER_CREATED,
      payload: {
        id: '1',
      },
    }

    const response = await sendUsersEvent(logger, mockProducer, event)

    expect(response).toMatch(anyUUID)
    expect(mockSend).toHaveBeenCalledWith(expect.objectContaining({
      topic: usersTopic,
      messages: [
        {
          key: response,
          value: JSON.stringify(event),
        },
      ],
    }))
  })

  it('sends a [users] event and returns error if NOT successful', async() => {
    mockSend.mockReturnValueOnce([
      { errorCode: 666 },
    ])
    const event: UserCreatedEvent = {
      action: UserActions.USER_CREATED,
      payload: {
        id: '1',
      },
    }

    const response = await sendUsersEvent(logger, mockProducer, event)

    expect(response).toEqual(new Error('Sending message failed: 666'))
    expect(mockSend).toHaveBeenCalledWith(expect.objectContaining({
      topic: usersTopic,
      messages: [
        {
          key: expect.anything(),
          value: JSON.stringify(event),
        },
      ],
    }))
  })

})
