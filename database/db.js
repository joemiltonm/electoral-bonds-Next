import knex from 'knex';
import { development } from '../knexfile';
import { production } from '../knexfile';

import { config } from 'dotenv';
config();



const db = process.env.ENV === 'development' ? knex(development) : knex(production)

export default db;
