import { getProducer } from '@birdr/events'
import type { FastifyPluginAsync } from 'fastify'
import * as fp from 'fastify-plugin'

import { config } from '../config'

const userEventProducerPlugin: FastifyPluginAsync = async (fastify, _) => {
  const producer = await getProducer(fastify.log, config.KAFKA_BROKER, 'users-event-producer')
  fastify.decorate('userEventProducer', producer)
}

export const userEventProducer = fp(userEventProducerPlugin)
