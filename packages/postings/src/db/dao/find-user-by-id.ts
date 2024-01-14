import pino from 'pino'

import { dbInstance } from '../client'

import BaseLogger = pino.BaseLogger
import type { User } from '../types/user'

export async function findUserById(logger: BaseLogger, id: number): Promise<User | Error> {
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
    return maybeUser
  } catch (err) {
    logger.warn({
      message: `DB error while finding user by id ${id}`,
      err,
    })
    return err as Error
  }
}
