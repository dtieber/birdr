import type { AuthHandler } from '@birdr/shared/dist/auth/auth-handler.decorator'
import type { Producer } from 'kafkajs'
import type { Knex } from 'knex'

interface AuthenticatedUser {
  userId: string
}

declare module 'fastify' {
  export interface FastifyInstance {
    auth: AuthHandler;
    database: Knex;
    userEventProducer: Producer;
  }

  export interface FastifyRequest {
    user: AuthenticatedUser | undefined
  }
}
