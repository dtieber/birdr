import { requestIdHeader } from '@birdr/shared'
import type { FastifyBaseLogger, FastifyInstance } from 'fastify'
import Fastify from 'fastify'
import { pino } from 'pino'

import { config } from './config'
import { getConsumer } from './events/consumer'
import { receiveUsersEvents } from './events/receive-users-events'
import { loggerConfig } from './logger/logging.configuration'
import { health } from './routes/health.route'

export const startServer = async (): Promise<FastifyInstance> => {
  const logger = pino(loggerConfig) as FastifyBaseLogger
  const consumer = await getConsumer(logger, config.KAFKA_BROKER, 'user-events-consumer')
  await receiveUsersEvents(logger, consumer, async (key, event) => {
    logger.info({
      message: `Processed event with key: ${key}`,
      event,
      userid: event.payload.id,
    })
  })

  const fastify = Fastify({
    logger,
  })

  await fastify.register(requestIdHeader)

  await fastify.register(health)

  await fastify.listen({
    host: config.HOST,
    port: config.PORT,
  })

  await fastify.ready()

  return fastify
}
