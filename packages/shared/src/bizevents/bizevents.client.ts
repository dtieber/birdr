export type BizEventPayload = {
  id: string
  event: {
    type: string
    provider: string
  }
}

export async function sendBizEvent<T extends BizEventPayload>(logger: BaseLogger, bizEvent: T): Promise<BizEventPayload | Error> {
  logger.info({ message: `Sending BizEvent with id ${bizEvent.id}` })
  // send post request
  return Error('Failed to send BizEvent')
}
