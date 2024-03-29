import type { FastifyPluginAsync } from 'fastify'
import * as fp from 'fastify-plugin'

import { dbInstance } from '../db/client'

const databasePlugin: FastifyPluginAsync = async (fastify, _) => {
  fastify.decorate('database', dbInstance)
}

export const database = fp(databasePlugin)
