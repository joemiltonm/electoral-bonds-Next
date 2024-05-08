
import Knex from "knex";
import csvParser from "csv-parser";
import fs from 'fs';

export async function seed(Knex) {

    await Knex('branch_code').del()

    const records = [];  // Array to hold all records and batch insert later

    return new Promise((resolve, reject) => {
        fs.createReadStream('./data/branch_code.csv')
        .pipe(csvParser())
        .on('data', (data) => {
            records.push(data);  // Push each record to the array
        })
        .on('end', async () => {
            try {
                // Insert all records in a batch
                await Knex('branch_code').insert(records);
                resolve();  // Resolve the promise after all inserts are done
            } catch (error) {
                reject(error);  // Reject the promise if there's an error
            }
        })
        .on('error', reject);  // Handle any error from the stream
    });
  
}
