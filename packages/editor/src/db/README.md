### Knex

##### Setup
First, add a run target to your package.json so that you can use the [CLI](https://knexjs.org/guide/migrations.html#migration-cli).

```
pnpm knex init -x ts --migrations-directory "src/db"
mv knexfile.ts src/db

pnpm knex migrate:make -x ts --migrations-directory migrations --knexfile src/db/knexfile.ts init-user-table

pnpm knex migrate:latest --knexfile src/db/knexfile.ts --env development
```
