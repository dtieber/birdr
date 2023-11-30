import type { FastifyBaseLogger, FastifyInstance } from 'fastify'
import Fastify from 'fastify'
import { pino } from 'pino'

import { config } from './config'
import { requestIdHeader } from './hooks/request-id-header.hook'
import { loggerConfig } from './logger/logging.configuration'
import { health } from './routes/health.route'

export const startServer = async (): Promise<FastifyInstance> => {
  const logger = pino(loggerConfig) as FastifyBaseLogger
  const fastify = Fastify({
    logger,
  })

  await fastify.register(requestIdHeader)

  await fastify.register(health)

  await fastify.listen({
    port: config.PORT,
  })

  await fastify.ready()

  return fastify
}
