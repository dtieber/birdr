import type { Consumer } from 'kafkajs'
import type { Knex } from 'knex'

declare module 'fastify' {
  export interface FastifyInstance {
    database: Knex;
    userEventConsumer: Consumer;
  }
}
