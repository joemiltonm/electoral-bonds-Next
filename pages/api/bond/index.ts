import db from '../../../database/db';

export default async function GET(req: any, res: any) {
    console.log("db", db)
    const total = await db('bonds').sum('Denominations as total_amount')
    const [party] = await db('bonds').countDistinct('Political_Party')
    const [purchaser] = await db('bonds').countDistinct('purchaser')
    const partyProportion : any = await db('bonds').select('Political_Party as name').sum({ value: 'Denominations' }).groupBy('Political_Party').orderBy('value', 'desc')
    const purchaseProportion = await db('bonds').select('purchaser as name').sum({ value: 'Denominations' }).groupBy('purchaser').orderBy('value', 'desc')

    const formattedData = partyProportion.map((item : any) => ({
        name: item.name,
        value: (parseInt(item.value, 10)/10000000)
    }));

    const formattedDataPurchase = purchaseProportion.map((item : any) => ({
        name: item.name,
        value: (parseInt(item.value, 10)/10000000)
    }));

    const final = {
        formattedData,
        total,
        party,
        purchaser,
        formattedDataPurchase,
    }

    res.json(final)
    
}