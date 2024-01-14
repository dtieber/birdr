import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('posting', (table: Knex.TableBuilder) => {
    table.dropForeign('author')
  })
}

export async function down(_: Knex): Promise<void> {
}
