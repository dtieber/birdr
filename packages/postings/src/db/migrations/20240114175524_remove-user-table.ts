import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.dropTable('user')

}

export async function down(_: Knex): Promise<void> {
}
