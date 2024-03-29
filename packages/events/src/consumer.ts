import * as crypto from 'crypto'
import type { Consumer } from 'kafkajs'
import { Kafka, logLevel } from 'kafkajs'
import type { BaseLogger } from 'pino'

export const getConsumer = async (log: BaseLogger, connection: string, name: string): Promise<Consumer> => {
  const kafka = new Kafka({
    logLevel: logLevel.WARN,
    brokers: [
      connection,
    ],
    clientId: name,
  })
  const consumer = kafka.consumer({
    groupId: `${name}-group-${crypto.randomUUID()}`,
  })
  log.info({
    message: `Connecting consumer ${name} to Kafka`,
    connection,
  })
  await consumer.connect()
  return consumer
}
