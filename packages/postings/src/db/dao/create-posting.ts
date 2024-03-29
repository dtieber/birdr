import pino from 'pino'

import { dbInstance } from '../client'

import BaseLogger = pino.BaseLogger
import type { Posting } from '../types/posting'
import { readPostingById } from './read-posting-by-id'

export async function createPosting(logger: BaseLogger, userId: number, text: string): Promise<Posting | Error> {
  try {
    const result = await dbInstance.insert<Posting>({
      author: userId,
      text,
      approved: false,
    })
      .returning('id')
      .into('posting')
    return readPostingById(logger, result[0].id)
  } catch (err) {
    logger.warn({
      message: 'DB error while adding posting',
      userId,
      err,
    })
    return err as Error
  }
}
