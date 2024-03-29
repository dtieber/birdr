import pino from 'pino'

import { dbInstance } from '../client'

import BaseLogger = pino.BaseLogger
import { Failure } from '@birdr/shared'

import { ErrorCodes } from '../../errors/error-codes'
import type { User } from '../types/user'

export async function readUserById(logger: BaseLogger, id: string): Promise<User | Failure> {
  try {
    const maybeUser = await dbInstance.select<User>('*')
      .from('user')
      .where({
        id,
      })
      .first()
    if(!maybeUser) {
      return new Failure(`User with id ${id} not found`, ErrorCodes.USER_NOT_FOUND)
    }
    return {
      id: maybeUser.id.toString(),
      username: maybeUser.username,
    }
  } catch (err) {
    const e = err as Error
    logger.warn({
      message: `DB error while reading user by id ${id}`,
      err,
    })
    return new Failure(e.message)
  }
}
