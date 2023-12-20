import pino from 'pino'

import { dbInstance } from '../client'

import BaseLogger = pino.BaseLogger
import type { Posting } from '../types/posting'
import type { User } from '../types/user'

export async function findPostingById(logger: BaseLogger, id: number): Promise<Posting | Error> {
  try {
    const maybePosting = await dbInstance
      .select([
        'posting.id',
        'posting.text',
        'posting.approved',
        'posting.updated',
        'user.id as userid',
        'user.username',
      ])
      .from('posting')
      .where({
        'posting.id': id,
      })
      .leftJoin<User>('user', 'user.id', 'posting.author')
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
