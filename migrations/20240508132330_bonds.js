
import Knex from "knex";

export async function up(Knex) {
    await Knex.schema.createTable('bonds', (table) => {
        table.integer('Sr_No').primary(); // Assuming Sr_No is a unique identifier and primary key
        table.date('Date_of_Encashment');
        table.string('Political_Party');
        table.string('Account_no_of_Political_Party');
        table.string('Prefix');
        table.integer('Bond_Number'); // Assuming Bond_Number is alphanumeric
        table.bigInteger('Denominations'); // For large numeric values
        table.integer('Pay_Branch_Code');
        table.integer('Pay_Teller');
        table.integer('sr_no');
        table.string('reference_no');
        table.date('journal_date');
        table.date('date_of_purchase');
        table.date('date_of_expiry');
        table.string('purchaser');
        table.string('prefix');
        table.integer('bond_number');
        table.bigInteger('denominations');
        table.integer('issue_branch_code');
        table.integer('issue_teller');
        table.string('status'); 
    })
}

export async function down(Knex) {
    await Knex.schema.dropTable('bonds')
}

