import { isFailure } from '@birdr/shared'
import type { FastifyInstance, FastifyPluginAsync } from 'fastify'
import * as fp from 'fastify-plugin'
import type { FromSchema } from 'json-schema-to-ts'

import { readUserById } from '../db/dao/read-user-by-id'
import { ErrorCodes } from '../errors/error-codes'
import type { findUserRequestParams } from './find-user.schema'
import { requestSchema, responseSchema } from './find-user.schema'

const routePlugin: FastifyPluginAsync = async (fastify: FastifyInstance, _) => {
  fastify.route<{ Params: FromSchema<typeof findUserRequestParams> }>({
    method: 'GET',
    url: '/users/:id',
    preHandler: fastify.auth,
    schema: {
      ...requestSchema,
      ...responseSchema,
    },
    handler: async (request, reply): Promise<void> => {
      request.log.info({
        message: `Trying to find ${request.params.id}`,
      })

      const dbResult = await readUserById(request.log, fastify.database, request.params.id)

      if (isFailure(dbResult)) {
        if(dbResult.code === ErrorCodes.USER_NOT_FOUND) {
          return reply.code(404).send({
            message: 'User not found',
          })
        }

        return reply.code(500).send({
          message: dbResult.message,
        })
      }

      return reply.code(200).send({
        userid: dbResult.id,
        username: dbResult.username,
      })
    },
  })
}

export const findUser = fp(routePlugin)
