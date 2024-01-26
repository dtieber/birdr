import { afterAll, beforeAll, describe, expect, it } from '@jest/globals'
import type { FastifyInstance } from 'fastify'
import Fastify from 'fastify'

import { authHandler } from '../auth-handler.decorator'

describe('auth-handler decorator', () => {

  let application: FastifyInstance

  beforeAll(async() => {
    application = Fastify()
    await application.register(authHandler)
    await application.route({
      method: 'GET',
      url: '/',
      preHandler: application.auth,
      handler: async (request, reply) => {
        await reply.send({ user: request.user })
      },
    })
  })

  afterAll(async() => {
    await application.close()
  })

  it('used as prehandler rejects requests without a `x-user` header', async () => {
    const response = await application.inject({
      method: 'GET',
      url: '/',
    })

    expect(response.statusCode).toEqual(401)
  })

  it('used as prehandler accepts requests with a valid `x-user` header', async () => {
    const response = await application.inject({
      method: 'GET',
      url: '/',
      headers:{
        'x-user': '123',
      },
    })

    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual(JSON.stringify({
      user:  {
        userId: '123',
      },
    }))
  })

})
