
import db from "../../../database/db";
import { NextApiRequest, NextApiResponse } from "next";

let fiscalYears = [
    { name: 'FY20', startDate: '2019-04-01', endDate: '2020-03-31' },
    { name: 'FY21', startDate: '2020-04-01', endDate: '2021-03-31' },
    { name: 'FY22', startDate: '2021-04-01', endDate: '2022-03-31' },
    { name: 'FY23', startDate: '2022-04-01', endDate: '2023-03-31' },
    { name: 'FY24', startDate: '2023-04-01', endDate: '2024-03-31' }
];


export default async function POST(req: NextApiRequest, res: NextApiResponse) {
    
    const { party, FY } = req.body;

    const dates = fiscalYears.filter((fy) => {
                return fy.name === FY
    })

    const result = await db('combined_table').select(db.raw(`'${FY}' as name`)).sum({ value: 'Denominations' }).where('Political_Party', '=', party).whereBetween('date_of_purchase', [dates[0].startDate, dates[0].endDate])

    res.json(result)

}