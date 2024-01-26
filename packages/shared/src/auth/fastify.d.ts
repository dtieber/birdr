import type * as http from 'http'

import type { AuthHandler } from './auth-handler.decorator'

declare module 'fastify' {
  export interface FastifyInstance<
    _ = http.Server,
    _2 = http.IncomingMessage,
    _3 = http.ServerResponse
    > {
    auth: AuthHandler;
  }

  export interface FastifyRequest {
    user: number
  }
}
