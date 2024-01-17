import type { UserEvent } from '@birdr/events'
import { usersTopic } from '@birdr/events'
import type { Consumer } from 'kafkajs'
import type { BaseLogger } from 'pino'

export type ProcessorFn = (key: string, event: UserEvent) => Promise<void>

export const receiveUsersEvents =
  async (log: BaseLogger, consumer: Consumer, processor: ProcessorFn): Promise<Consumer> => {
    await consumer.subscribe({ topic: usersTopic })
    await consumer.run({ eachMessage: async ({ message }) => {
      const key = message.key?.toString() ?? '-'
      const event = message.value ? JSON.parse(message.value.toString()) : {}
      log.info({
        message: 'Received new event',
        key,
        event,
      })
      await processor(key, event)
    } })

    return consumer
  }
