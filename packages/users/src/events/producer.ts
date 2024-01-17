import type { Producer } from 'kafkajs'
import { Kafka, logLevel, Partitioners } from 'kafkajs'
import type { BaseLogger } from 'pino'

export const getProducer = async (log: BaseLogger, connection: string, name: string): Promise<Producer> => {
  const kafka = new Kafka({
    logLevel: logLevel.WARN,
    brokers: [
      connection,
    ],
    clientId: name,
  })
  const producer = kafka.producer({ createPartitioner: Partitioners.DefaultPartitioner })
  log.info({
    message: `Connecting producer ${name} to Kafka`,
    connection,
  })
  await producer.connect()
  return producer
}
