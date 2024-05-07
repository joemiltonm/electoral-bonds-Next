// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */

import { config } from 'dotenv';
config();


const development = {
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

export default development;

