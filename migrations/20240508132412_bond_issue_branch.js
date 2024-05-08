
import Knex from 'knex';


export async function up(Knex){
    await Knex.schema.createTable('branch_code', (table) => {
        table.integer('sl_no').primary();
        table.string('state');
        table.integer('branch_code');
    })

}


export async function down(Knex){
    await Knex.schema.dropTable('branch_code')

}