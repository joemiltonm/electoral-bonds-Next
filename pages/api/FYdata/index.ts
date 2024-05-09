import db from '../../../database/db'

const fiscalYears = [
    { name: 'FY20', startDate: '2019-04-01', endDate: '2020-03-31' },
    { name: 'FY21', startDate: '2020-04-01', endDate: '2021-03-31' },
    { name: 'FY22', startDate: '2021-04-01', endDate: '2022-03-31' },
    { name: 'FY23', startDate: '2022-04-01', endDate: '2023-03-31' },
    { name: 'FY24', startDate: '2023-04-01', endDate: '2024-03-31' }
];


export default async function GET(req: any, res: any) {
    
    const FYdata = await Promise.all(fiscalYears.map(fy =>
        db('combined_table')
            .select(db.raw(`'${fy.name}' as name`))
            .sum({ value: 'Denominations' })
            .whereBetween('date_of_purchase', [fy.startDate, fy.endDate])
    ));
    
    let obj : any = []

    const finalFY = FYdata.map((fy, index) => {
        obj.push(fy[0])
    })

    res.send(obj)
}

