import { UserActions } from '@birdr/events'
import { isError, isFailure } from '@birdr/shared'
import type { FastifyInstance, FastifyPluginAsync } from 'fastify'
import * as fp from 'fastify-plugin'
import type { FromSchema } from 'json-schema-to-ts'

import { createUser } from '../db/dao/create-user'
import { ErrorCodes } from '../errors/error-codes'
import { sendUsersEvent } from '../events/send-users-event'
import type { AddUserRequestBody } from './add-user.schema'
import { requestSchema, responseSchema } from './add-user.schema'

const routePlugin: FastifyPluginAsync = async (fastify: FastifyInstance, _) => {
  fastify.post<{ Body: FromSchema<typeof AddUserRequestBody> }>(
    '/users',
    {
      preHandler: fastify.auth,
      schema: {
        ...requestSchema,
        ...responseSchema,
      },
    },
    async (request, reply): Promise<void> => {
      request.log.info({
        message: `Trying to add ${request.body.username}`,
        request: request.body,
      })

      const dbResult = await createUser(request.log, fastify.database, request.body.username)

      if(isFailure(dbResult)) {
        if(dbResult.code === ErrorCodes.USER_ALREADY_EXISTS) {
          return reply.code(401).send({
            message: 'User exists already',
          })
        }
        return reply.code(500).send({
          message: dbResult.message,
        })
      }

      const messageId = await sendUsersEvent(request.log, fastify.userEventProducer, {
        action: UserActions.USER_CREATED,
        payload: {
          id: dbResult.id,
        },
      })
      if(isError(messageId)) {
        return reply.code(500).send({
          message: 'Failed to propagate user',
        })
      }
      request.log.info({ message: `Sent USER_CREATED message with id ${messageId}` })

      return reply.code(200).send({
        userid: dbResult.id,
      })
    },
  )
}

export const addUser = fp(routePlugin)
