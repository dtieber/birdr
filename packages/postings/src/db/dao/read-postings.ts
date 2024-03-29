import pino from 'pino'

import { dbInstance } from '../client'
import type { Posting } from '../types/posting'

import BaseLogger = pino.BaseLogger

export async function readPostings(logger: BaseLogger, limit: number, offset: number = 0): Promise<Posting[] | Error> {
  const maxNumberOfPostings = 20
  if(limit > maxNumberOfPostings) {
    return new Error(`Limit has to be below ${maxNumberOfPostings}`)
  }

  try {
    const postings = await dbInstance
      .select([
        'posting.id',
        'posting.text',
        'posting.approved',
        'posting.updated',
        'posting.author',
      ])
      .from<Posting>('posting')
      .where({
        approved: true,
      })
      .limit(limit)
      .offset(offset)
      .orderBy('updated', 'desc')

    logger.debug({
      message: 'Received',
      postings,
    })

    return postings.map(posting => ({
      id: posting.id.toString(),
      text: posting.text,
      approved: posting.approved,
      author: posting.author.toString(),
    }))
  } catch (err) {
    logger.warn({
      message: 'DB error while fetching postings',
      err,
    })
    return err as Error
  }
}
