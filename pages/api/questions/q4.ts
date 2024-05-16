

import db from "../../../database/db";
import { NextApiRequest, NextApiResponse } from "next";


export default async function POST(req: NextApiRequest, res: NextApiResponse) {
    
    const { donor, party } = req.body;
    const result = await db('bonds').sum({ value: 'Denominations' }).where('Political_Party', '=', party).where('purchaser', '=', donor);
    res.json(result)

}