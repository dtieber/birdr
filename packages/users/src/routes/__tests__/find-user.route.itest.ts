import { isFailure } from '@birdr/shared'
import { afterAll, beforeAll, describe, expect, it } from '@jest/globals'
import type { FastifyInstance } from 'fastify'
import Fastify from 'fastify'

import { dbInstance } from '../../db/client'
import { createUser } from '../../db/dao/create-user'
import { database } from '../../decorators/db-instance.decorator'
import { userEventProducer } from '../../decorators/user-event-producer.decorator'
import { addUser } from '../add-user.route'
import { findUser } from '../find-user.route'

describe('find-user route', () => {

  let application: FastifyInstance

  beforeAll(async() => {
    application = Fastify()
    await application.register(database)
    await application.register(userEventProducer)
    await application.register(addUser)
    await application.register(findUser)
  })

  afterAll(async() => {
    await application.close()
    await application.userEventProducer.disconnect()
    await application.database.destroy()
  })

  it('returns 200 with userid', async () => {
    const username = `testusername-${Date.now()}`
    const user = await createUser(application.log, dbInstance, username)
    if(isFailure(user)) {
      throw Error('Failed to create user')
    }

    const response = await application.inject({
      method: 'GET',
      url: `/users/${user.id}`,
    })

    expect(response.statusCode).toEqual(200)
    const parsedResponse = JSON.parse(response.body)
    expect(parsedResponse).toEqual({
      userid: user.id,
      username,
    })
  })

})
