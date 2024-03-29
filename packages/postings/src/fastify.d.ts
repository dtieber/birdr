import type { Consumer } from 'kafkajs'

declare module 'fastify' {
  export interface FastifyInstance {
    userEventConsumer: Consumer;
  }
}
