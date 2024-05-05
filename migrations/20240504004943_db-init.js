/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

import knex from "knex";

export async function up(knex){
    await knex.schema.createTable('Users', (table) => {
        table.increments('id').primary();
        table.string('name');
        table.string('email').unique();
        table.string('password');
    })

}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

export async function down(knex) {
    await knex.schema.dropTable('Users')
}