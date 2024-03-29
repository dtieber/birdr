import { authHandler, requestIdHeader } from '@birdr/shared'
import type { FastifyInstance } from 'fastify'
import Fastify from 'fastify'

import { config } from './config'
import { database } from './decorators/db-instance.decorator'
import { userEventProducer } from './decorators/user-event-producer.decorator'
import { logger } from './logger/logger'
import { addUser } from './routes/add-user.route'
import { health } from './routes/health.route'

export const startServer = async (): Promise<FastifyInstance> => {
  const fastify = Fastify({
    logger,
  })

  // hooks
  await fastify.register(requestIdHeader)

  // decorators
  await fastify.register(authHandler)
  await fastify.register(database)
  await fastify.register(userEventProducer)

  // routes
  await fastify.register(health)
  await fastify.register(addUser)

  await fastify.listen({
    host: config.HOST,
    port: config.PORT,
  })

  await fastify.ready()

  return fastify
}
