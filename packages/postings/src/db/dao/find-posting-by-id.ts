import pino from 'pino'

import { dbInstance } from '../client'

import BaseLogger = pino.BaseLogger
import type { Posting } from '../types/posting'

export async function findPostingById(logger: BaseLogger, id: number): Promise<Posting | Error> {
  try {
    const maybePosting = await dbInstance
      .select([
        'posting.id',
        'posting.text',
        'posting.approved',
        'posting.updated',
        'posting.author',
      ])
      .from('posting')
      .where({
        'posting.id': id,
      })
      .first()
    if(!maybePosting) {
      return new Error(`Posting with id ${id} not found`)
    }
    return maybePosting
  } catch (err) {
    logger.warn({
      message: `DB error while finding posting by id ${id}`,
      err,
    })
    return err as Error
  }
}
