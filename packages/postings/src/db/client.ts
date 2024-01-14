import * as knex from 'knex'

import dbConfig from './knexfile'

export const dbInstance = knex(dbConfig.development)
