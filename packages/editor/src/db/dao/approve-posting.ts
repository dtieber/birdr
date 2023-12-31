import pino from 'pino'

import { dbInstance } from '../client'

import BaseLogger = pino.BaseLogger
import type { Posting } from '../types/posting'
import { findPostingById } from './find-posting-by-id'

export async function approvePosting(logger: BaseLogger, id: number): Promise<Posting | Error> {
  try {
    await dbInstance('posting')
      .where({
        id,
      })
      .update<Posting>({
        approved: true,
      })
    return await findPostingById(logger, id)
  } catch (err) {
    logger.warn({
      message: 'DB error while finding user',
      err,
    })
    return err as Error
  }
}
