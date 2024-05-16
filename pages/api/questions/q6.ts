

import db from "../../../database/db";
import { NextApiRequest, NextApiResponse } from "next";


export default async function POST(req: NextApiRequest, res: NextApiResponse) {
    
    const { party } = req.body;
    const result = await db('combined_table').select('state').where('Political_Party', '=', party).groupBy('state')

    console.log("q6 states", result)

    res.json(result)
}