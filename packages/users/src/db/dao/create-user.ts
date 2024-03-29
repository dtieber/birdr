import pino from 'pino'
import BaseLogger = pino.BaseLogger

import { dbInstance } from '../client'
import type { User } from '../types/user'
import { readUserById } from './read-user-by-id'

export async function createUser(logger: BaseLogger, username: string): Promise<User | Error> {
  try {
    const result = await dbInstance.insert<User>({ username }).returning('id').into('user')
    return readUserById(logger, result[0].id)
  } catch (err) {
    logger.warn({
      message: `DB error while creating user ${username}`,
      err,
    })
    return err as Error
  }
}
