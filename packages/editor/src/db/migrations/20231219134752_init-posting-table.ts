import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('posting', (table: Knex.TableBuilder) => {
    table.increments('id').primary()
    table.string('text').notNullable()
    table.boolean('approved').defaultTo(false)
    table.integer('author').unsigned().notNullable()
    table.datetime('updated').defaultTo(knex.fn.now())

    table.foreign('author').references('id').inTable('user')
  })
}

export async function down(_: Knex): Promise<void> {
}
