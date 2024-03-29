import pino from 'pino'

import { dbInstance } from '../client'

import BaseLogger = pino.BaseLogger
import type { User } from '../types/user'

export async function readUserById(logger: BaseLogger, id: string): Promise<User | Error> {
  try {
    const maybeUser = await dbInstance.select<User>('*')
      .from('user')
      .where({
        id,
      })
      .first()
    if(!maybeUser) {
      return new Error(`User with id ${id} not found`)
    }
    return {
      id: maybeUser.id.toString(),
      username: maybeUser.username,
    }
  } catch (err) {
    logger.warn({
      message: `DB error while reading user by id ${id}`,
      err,
    })
    return err as Error
  }
}
