import type { FastifyPluginAsync } from 'fastify'
import * as fp from 'fastify-plugin'

import { config } from '../config'
import { getConsumer } from '../events/consumer'
import { receiveUsersEvents } from '../events/receive-users-events'

const userEventConsumerPlugin: FastifyPluginAsync = async (fastify, _) => {
  const consumer = await getConsumer(fastify.log, config.KAFKA_BROKER, 'user-events-consumer')
  await receiveUsersEvents(fastify.log, consumer, async (key, event) => {
    fastify.log.info({
      message: `Processed event with key: ${key}`,
      event,
      userid: event.payload.id,
    })
  })
  fastify.decorate('userEventConsumer', consumer)
}

export const userEventConsumer = fp(userEventConsumerPlugin)
