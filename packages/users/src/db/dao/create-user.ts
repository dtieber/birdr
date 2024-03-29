import pino from 'pino'
import BaseLogger = pino.BaseLogger

import { Failure } from '@birdr/shared'

import { dbInstance } from '../client'
import type { User } from '../types/user'
import { readUserById } from './read-user-by-id'

export async function createUser(logger: BaseLogger, username: string): Promise<User | Failure> {
  try {
    const result = await dbInstance.insert<User>({ username }).returning('id').into('user')
    return readUserById(logger, result[0].id)
  } catch (err) {
    const e = err as PgError
    logger.warn({
      message: `DB error while creating user ${username}`,
      e,
    })

    return new Failure(e.message)
  }
}
