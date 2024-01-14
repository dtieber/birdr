import pino from 'pino'

import { dbInstance } from '../client'
import type { Posting } from '../types/posting'
import type { User } from '../types/user'

import BaseLogger = pino.BaseLogger

export async function fetchPostings(logger: BaseLogger, limit: number, offset: number = 0): Promise<Posting[] | Error> {
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
        'user.id as userid',
        'user.username',
      ])
      .from<Posting>('posting')
      .where({
        approved: true,
      })
      .leftJoin<User>('user', 'user.id', 'posting.author')
      .limit(limit)
      .offset(offset)
      .orderBy('updated', 'desc')

    logger.debug({
      message: 'Received',
      postings,
    })

    return postings
  } catch (err) {
    logger.warn({
      message: 'DB error while fetching postings',
      err,
    })
    return err as Error
  }
}
