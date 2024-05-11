// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */

import { config } from 'dotenv';
config();


export const production = {
    client: 'pg',
    connection: process.env.DB_CONNECTION,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

export const development = {
  client: 'pg',
  connection: {
    host : 'localhost',
    user : 'postgres',
    password: 'password',
    database: 'postgres',
    port: 5432
  },
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    tableName: 'knex_migrations'
  },
  seed: {
    directory: './seeds'
  }
}

