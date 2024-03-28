import { requestIdHeader } from '@birdr/shared'
import type { FastifyInstance } from 'fastify'
import Fastify from 'fastify'

import { config } from './config'
import { logger } from './logger/logger'
import { health } from './routes/health.route'

export const startServer = async (): Promise<FastifyInstance> => {
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
