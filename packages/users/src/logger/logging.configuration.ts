import { logLevelFormatter, timestampFormatter } from '@birdr/shared'
import type { PinoLoggerOptions } from 'fastify/types/logger'

import { config } from '../config'

const loggerFormatters = {
  level: logLevelFormatter,
}

export const loggerConfig: PinoLoggerOptions = {
  level: config.LOG_LEVEL
  ,
  messageKey: 'msg',
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
