// Corrected version of pages/api/user/route.ts

import type { NextApiRequest, NextApiResponse } from 'next';

export default async function GET(req: NextApiRequest, res: NextApiResponse) {
  res.json({ fname: 'joe' });
}
