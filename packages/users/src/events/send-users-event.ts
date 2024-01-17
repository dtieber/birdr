import type { UserEvent } from '@birdr/events'
import { usersTopic } from '@birdr/events'
import type { UUID } from 'crypto'
import * as crypto from 'crypto'
import type { Producer } from 'kafkajs'
import { CompressionTypes } from 'kafkajs'
import type { BaseLogger } from 'pino'

export const sendUsersEvent = async(log: BaseLogger, producer: Producer, payload: UserEvent): Promise<UUID | Error> => {
  const key = crypto.randomUUID()
  log.info({
    message: 'Sending new event',
    key,
    payload,
  })
  const response = await producer.send({
    topic: usersTopic,
    compression: CompressionTypes.GZIP,
    messages: [
      {
        key,
        value: JSON.stringify(payload),
      },
    ],
  })

  const errorCode = response.pop()?.errorCode
  if(errorCode !== 0) {
    log.warn({
      message: 'Sending new event failed',
      errorCode,
    })
    return new Error(`Sending message failed: ${errorCode}`)
  }

  return key
}
