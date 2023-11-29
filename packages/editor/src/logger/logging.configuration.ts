import type { PinoLoggerOptions } from 'fastify/types/logger'

import { logLevelFormatter, timestampFormatter } from './logging.formatter'

const loggerFormatters = {
  level: logLevelFormatter,
}

export const loggerConfig: PinoLoggerOptions = {
  level: 'info',
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
