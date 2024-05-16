
import db from "../../../database/db";
import { NextApiRequest, NextApiResponse } from "next";



export default async function POST(req: NextApiRequest, res: NextApiResponse) {
    
    const { party } = req.body;

    const purchaseProportion = await db('bonds').select('purchaser as name').sum({ value: 'Denominations' }).where('Political_Party', '=', party).groupBy('purchaser').orderBy('value', 'desc').limit(1)

    res.json(purchaseProportion)

}