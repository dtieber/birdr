import type { FastifyBaseLogger, FastifyInstance } from 'fastify'
import Fastify from 'fastify'
import { pino } from 'pino'

import { config } from './config'
import { loggerConfig } from './logger/logging.configuration'

export const startServer = async (): Promise<FastifyInstance> => {
  const logger = pino(loggerConfig) as FastifyBaseLogger
  const fastify = Fastify({
    logger,
  })

  await fastify.listen({
    host: config.HOST,
    port: config.PORT,
  })

  await fastify.ready()

  return fastify
}
