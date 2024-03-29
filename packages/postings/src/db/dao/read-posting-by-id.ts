import pino from 'pino'

import BaseLogger = pino.BaseLogger
import type { Knex } from 'knex'

import type { Posting } from '../types/posting'

export async function readPostingById(logger: BaseLogger, dbInstance: Knex, id: string): Promise<Posting | Error> {
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
    return {
      id: maybePosting.id.toString(),
      text: maybePosting.text,
      approved: maybePosting.approved,
      author: maybePosting.author.toString(),
    }
  } catch (err) {
    logger.warn({
      message: `DB error while finding posting by id ${id}`,
      err,
    })
    return err as Error
  }
}
