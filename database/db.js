import knex from 'knex';
import development from '../knexfile';

const db = knex(development);

export default db;
