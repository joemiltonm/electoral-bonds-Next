
import db from "../../../database/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function POST(req: NextApiRequest, res: NextApiResponse) {
    
    const { donor } = req.body;

    const result = await db('bonds').select('Political_Party').where('purchaser', '=', donor).groupBy('Political_Party').orderBy('Political_Party', 'asec') 
    
    res.json(result)

}