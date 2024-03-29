import { requestIdHeader } from '@birdr/shared'
import type { FastifyBaseLogger, FastifyInstance } from 'fastify'
import Fastify from 'fastify'
import { pino } from 'pino'

import { config } from './config'
import { loggerConfig } from './logger/logging.configuration'
import { health } from './routes/health.route'

export const startServer = async (): Promise<FastifyInstance> => {
  const logger = pino(loggerConfig) as FastifyBaseLogger
  const fastify = Fastify({
    logger,
  })

  // hooks
  await fastify.register(requestIdHeader)

  // routes
  await fastify.register(health)

  await fastify.listen({
    host: config.HOST,
    port: config.PORT,
  })

  await fastify.ready()

  return fastify
}
