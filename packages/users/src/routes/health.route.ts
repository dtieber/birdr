import { UserActions } from '@birdr/events'
import type { FastifyPluginAsync } from 'fastify'
import * as fp from 'fastify-plugin'

import { config } from '../config'
import { getProducer } from '../events/producer'
import { sendUsersEvent } from '../events/send-users-event'
import { requestSchema, responseSchema } from './health.schema'

const routePlugin: FastifyPluginAsync = async (fastify, _) => {
  fastify.route({
    method: 'GET',
    url: '/health',
    schema: {
      ...requestSchema,
      ...responseSchema,
    },
    handler: async (request, reply): Promise<void> => {
      const producer = await getProducer(request.log, config.KAFKA_BROKER, 'users-event-produccer')
      const messageId = await sendUsersEvent(request.log, producer, {
        action: UserActions.USER_DELETED,
        payload: {
          id: 1,
        },
      })
      request.log.info({ message: `Sent USER_DELETED message with id ${messageId}` })
      return reply.code(200).send({
        status: 'UP',
      })
    },
  })
}

export const health = fp(routePlugin)
