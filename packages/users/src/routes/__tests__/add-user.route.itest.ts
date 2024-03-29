import { afterAll, beforeAll, describe, expect, it } from '@jest/globals'
import type { FastifyInstance } from 'fastify'
import Fastify from 'fastify'

import { database } from '../../decorators/db-instance.decorator'
import { userEventProducer } from '../../decorators/user-event-producer.decorator'
import { addUser } from '../add-user.route'

describe('add-user route', () => {

  let application: FastifyInstance

  beforeAll(async() => {
    application = Fastify()
    await application.register(database)
    await application.register(userEventProducer)
    await application.register(addUser)
  })

  afterAll(async() => {
    await application.close()
    await application.userEventProducer.disconnect()
    await application.database.destroy()
  })

  it('returns 200 with userid', async () => {
    const response = await application.inject({
      method: 'POST',
      url: '/users',
      body: {
        username: `testusername-${Date.now()}`,
      },
    })

    expect(response.statusCode).toEqual(200)
    const parsedResponse = JSON.parse(response.body)
    expect(parsedResponse).toEqual({
      userid: expect.any(String),
    })
  })

})
