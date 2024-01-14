import { afterAll, beforeAll, describe, expect, it } from '@jest/globals'
import type { FastifyInstance } from 'fastify'
import Fastify from 'fastify'

import { health } from '../health.route'

describe('health route', () => {

  let application: FastifyInstance

  beforeAll(async() => {
    application = Fastify()
    await application.register(health)
  })

  afterAll(async() => {
    await application.close()
  })

  it('assembles 200 response because application is always up and healthy', async () => {
    const response = await application.inject({
      method: 'GET',
      url: '/health',
    })

    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual(JSON.stringify({
      status: 'UP',
    }))
  })

})
