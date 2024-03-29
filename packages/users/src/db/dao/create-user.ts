import pino from 'pino'
import BaseLogger = pino.BaseLogger

import { Failure } from '@birdr/shared'
import type { Knex } from 'knex'

import { ErrorCodes } from '../../errors/error-codes'
import type { User } from '../types/user'
import { readUserById } from './read-user-by-id'

interface PgError extends Error {
  routine: string | undefined
}

export async function createUser(logger: BaseLogger, dbInstance: Knex, username: string): Promise<User | Failure> {
  try {
    const result = await dbInstance.insert<User>({ username }).returning('id').into('user')
    return readUserById(logger, dbInstance, result[0].id)
  } catch (err) {
    const e = err as PgError
    logger.warn({
      message: `DB error while creating user ${username}`,
      e,
    })

    if(e.routine === '_bt_check_unique') {
      return new Failure('User already exists', ErrorCodes.USER_ALREADY_EXISTS)
    }

    return new Failure(e.message)
  }
}
