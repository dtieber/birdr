import { requestIdHeader } from '@birdr/shared'
import type { FastifyBaseLogger, FastifyInstance } from 'fastify'
import Fastify from 'fastify'
import { pino } from 'pino'

import { config } from './config'
import { database } from './decorators/db-instance.decorator'
import { userEventConsumer } from './decorators/user-event-consumer.decorator'
import { loggerConfig } from './logger/logging.configuration'
import { health } from './routes/health.route'

export const startServer = async (): Promise<FastifyInstance> => {
  const logger = pino(loggerConfig) as FastifyBaseLogger
  const fastify = Fastify({
    logger,
  })

  // hooks
  await fastify.register(requestIdHeader)

  // decorators
  await fastify.register(database)
  await fastify.register(userEventConsumer)

  // routes
  await fastify.register(health)

  await fastify.listen({
    host: config.HOST,
    port: config.PORT,
  })

  await fastify.ready()

  return fastify
}
