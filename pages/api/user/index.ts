// Corrected version of pages/api/user/route.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import db from "../../../database/db"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const users = await db('combined_table').select('*').limit(10);
      res.status(200).json(users);
    } catch (error) {
      console.error('Error accessing database', error);
      res.status(500).json({ error: 'Failed to fetch data' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}