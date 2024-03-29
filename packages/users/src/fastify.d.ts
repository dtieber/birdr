import type { Producer } from 'kafkajs'

declare module 'fastify' {
  export interface FastifyInstance {
    userEventProducer: Producer;
  }
}
