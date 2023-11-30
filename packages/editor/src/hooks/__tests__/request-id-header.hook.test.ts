import { afterAll, beforeAll, describe, expect, it } from '@jest/globals'
import type { FastifyInstance } from 'fastify'
import Fastify from 'fastify'

import { requestIdHeader } from '../request-id-header.hook'

describe('request-id-header hook', () => {

  let application: FastifyInstance

  beforeAll(async() => {
    application = Fastify()
    await application.register(requestIdHeader)
  })

  afterAll(async() => {
    await application.close()
  })

  it('exposes a request id in the header', async () => {
    const response = await application.inject({
      method: 'GET',
      url: '/',
    })

    expect(response.headers['x-request-id']).not.toBeUndefined()
  })

})
