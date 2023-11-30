import type { FastifyReply, FastifyRequest } from 'fastify'
import type { FastifyPluginAsync } from 'fastify'
import * as fp from 'fastify-plugin'

const requestIdHeaderPlugin: FastifyPluginAsync = async (fastify, _) => {
  fastify.addHook('onSend', async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
    void reply.header('X-Request-ID', request.id)
  })
}

export const requestIdHeader = fp(requestIdHeaderPlugin)
