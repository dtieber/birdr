import { getConsumer } from '@birdr/events'
import { isError } from '@birdr/shared'
import type { FastifyPluginAsync } from 'fastify'
import * as fp from 'fastify-plugin'

import { config } from '../config'
import { approvePosting } from '../db/dao/approve-posting'
import { createPosting } from '../db/dao/create-posting'
import { receiveUsersEvents } from '../events/receive-users-events'

const userEventConsumerPlugin: FastifyPluginAsync = async (fastify, _) => {
  const consumer = await getConsumer(fastify.log, config.KAFKA_BROKER, 'user-events-consumer')
  await receiveUsersEvents(fastify.log, consumer, async (key, event) => {
    const userid = event.payload.id
    fastify.log.info({
      message: `Processed event with key: ${key}`,
      event,
      userid,
    })
    const posting = await createPosting(fastify.log, fastify.database, userid, 'Hello world!')
    if(!isError(posting)) {
      await approvePosting(fastify.log, fastify.database, posting.id)
      fastify.log.info(`Hello world posting for user ${userid} created and approved`)
    }
  })
  fastify.decorate('userEventConsumer', consumer)
}

export const userEventConsumer = fp(userEventConsumerPlugin)
