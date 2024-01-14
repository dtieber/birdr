import type { FastifyPluginAsync } from 'fastify'
import * as fp from 'fastify-plugin'

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
      return reply.code(200).send({
        status: 'UP',
      })
    },
  })
}

export const health = fp(routePlugin)
