import type { FastifyBaseLogger } from 'fastify'
import { pino } from 'pino'

import { loggerConfig } from './logging.configuration'

export const logger = pino(loggerConfig) as FastifyBaseLogger
