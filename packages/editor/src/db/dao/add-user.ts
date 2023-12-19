import pino from 'pino'
import BaseLogger = pino.BaseLogger

import { dbInstance } from '../client'
import type { User } from '../types/user'
import { findUserById } from './find-user-by-id'

export async function addUser(logger: BaseLogger, username: string): Promise<User | Error> {
  try {
    const result = await dbInstance.insert<User>({ username }).returning('id').into('user')
    return findUserById(logger, result[0].id)
  } catch (err) {
    logger.warn({
      message: `DB error while adding user ${username}`,
      err,
    })
    return err as Error
  }
}
