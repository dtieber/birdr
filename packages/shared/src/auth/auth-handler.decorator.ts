import type { FastifyReply, FastifyRequest } from 'fastify'
import type { FastifyPluginAsync } from 'fastify'
import * as fp from 'fastify-plugin'

export interface AuthenticatedFastifyRequest extends FastifyRequest {
  user: number;
}

export type AuthHandler = (request: FastifyRequest, reply: FastifyReply) => Promise<void>

const authHandlerDecorator: FastifyPluginAsync = async (fastify, _) => {
  fastify.decorate('auth', async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
    const userId = Number(request.headers['x-user'])
    if(!userId || isNaN(userId)) {
      request.log.warn('Received request from authenticated user')
      await reply.code(401).send()
    }
    // eslint-disable-next-line no-param-reassign
    (request as AuthenticatedFastifyRequest).user = userId
  })
}

export const authHandler = fp(authHandlerDecorator)
