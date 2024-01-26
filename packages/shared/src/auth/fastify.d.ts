import type { AuthHandler } from './auth-handler.decorator'

interface AuthenticatedUser {
  userId: string
}

declare module 'fastify' {
  export interface FastifyInstance {
    auth: AuthHandler;
  }

  export interface FastifyRequest {
    user: AuthenticatedUser | undefined
  }
}
