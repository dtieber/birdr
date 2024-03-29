import pino from 'pino'

import { dbInstance } from '../client'

import BaseLogger = pino.BaseLogger
import type { Posting } from '../types/posting'
import { readPostingById } from './read-posting-by-id'

export async function approvePosting(logger: BaseLogger, id: string): Promise<Posting | Error> {
  try {
    await dbInstance('posting')
      .where({
        id,
      })
      .update<Posting>({
        approved: true,
      })
    return await readPostingById(logger, id)
  } catch (err) {
    logger.warn({
      message: 'DB error while finding user',
      err,
    })
    return err as Error
  }
}
