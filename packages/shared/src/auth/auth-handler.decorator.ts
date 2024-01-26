import type { FastifyReply, FastifyRequest } from 'fastify'
import type { FastifyPluginAsync } from 'fastify'
import * as fp from 'fastify-plugin'

interface AuthenticatedUser {
  userId: string
}

export interface AuthenticatedFastifyRequest extends FastifyRequest {
  user: AuthenticatedUser | undefined
}

export type AuthHandler = (request: FastifyRequest, reply: FastifyReply) => Promise<void>

const authHandlerDecorator: FastifyPluginAsync = async (fastify, _) => {
  fastify.decorate('auth', async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
    const userId = request.headers['x-user'] as string
    if(!userId) {
      request.log.warn('Received request from unauthenticated user')
      await reply.code(401).send()
    }
    // eslint-disable-next-line no-param-reassign
    (request as AuthenticatedFastifyRequest).user = { userId: userId }
  })
}

export const authHandler = fp(authHandlerDecorator)
