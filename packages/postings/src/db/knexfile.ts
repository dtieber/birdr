import type { Knex } from 'knex'

export const dbConfig: { [key: string]: Knex.Config } = {
  development: {
    client: 'postgresql',
    connection: {
      host: 'localhost',
      port: 5001,
      database: 'postings',
      user: 'myuser',
      password: 'mypassword',
    },
  },
}

// eslint-disable-next-line import/no-default-export
export default dbConfig
