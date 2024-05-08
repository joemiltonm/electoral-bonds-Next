
import Knex from "knex"

export async function up(Knex) {
    await Knex.schema.raw(`
            CREATE TABLE combined_table AS
            SELECT 
                bonds."Sr_No", 
                bonds."Political_Party", 
                bonds."Prefix", 
                bonds."Bond_Number",
                bonds."Denominations",
                bonds."date_of_purchase",
                bonds."purchaser", 
                bonds."issue_branch_code",
                branch_code."state"
            FROM 
                bonds
            INNER JOIN 
                branch_code
            ON 
                bonds.issue_branch_code = branch_code.branch_code
        `);
}


export async function down(Knex) {

    await Knex.schema.dropTable('combined_table')
    
}