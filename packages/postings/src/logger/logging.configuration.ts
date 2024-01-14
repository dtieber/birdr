import type { PinoLoggerOptions } from 'fastify/types/logger'

import { config } from '../config'
import { logLevelFormatter, timestampFormatter } from './logging.formatter'

const loggerFormatters = {
  level: logLevelFormatter,
}

export const loggerConfig: PinoLoggerOptions = {
  level: config.LOG_LEVEL,
  messageKey: 'message',
  formatters: loggerFormatters,
  redact: {
    paths: [
      'hostname',
      'pid',
    ],
    remove: true,
  },
  timestamp: timestampFormatter,
}
