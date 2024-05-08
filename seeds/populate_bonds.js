
  import Knex from 'knex';
  import csvParser from 'csv-parser';
  import fs from 'fs';

  export async function seed(Knex) {
    
    async function readCSVAndSeedDB(filename, batchSize = 1000) {
      let results = [];
      const stream = fs.createReadStream(filename).pipe(csvParser());

      for await (const data of stream) {
          results.push(data);
          if (results.length >= batchSize) {
              await Knex('bonds').insert(results);
              results = [];
          }
      }

      if (results.length > 0) {
          await Knex('bonds').insert(results);
      }
  }

    try {
      await Knex('bonds').del()
      await readCSVAndSeedDB('./data/eb_final_data.csv');
    }catch (err) {
      console.log(err);
    }
  }


