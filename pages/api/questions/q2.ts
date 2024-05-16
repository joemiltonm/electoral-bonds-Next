

import db from "../../../database/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function POST(req: NextApiRequest, res: NextApiResponse) {
    
    const { party } = req.body;

    const result = await db('bonds').select('purchaser').where('Political_Party', '=', party).groupBy('purchaser').orderBy('purchaser', 'asec') 
    
    res.json(result)

}