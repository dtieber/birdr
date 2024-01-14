import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('user', (table: Knex.TableBuilder) => {
    table.increments('id').primary()
    table.string('username').notNullable().unique()
  })
}

export async function down(_: Knex): Promise<void> {
}
