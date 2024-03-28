import type { AuthHandler } from '@birdr/shared/dist/auth/auth-handler.decorator'
import type { Producer } from 'kafkajs'

interface AuthenticatedUser {
  userId: string
}

declare module 'fastify' {
  export interface FastifyInstance {
    auth: AuthHandler;
    userEventProducer: Producer;
  }

  export interface FastifyRequest {
    user: AuthenticatedUser | undefined
  }
}
