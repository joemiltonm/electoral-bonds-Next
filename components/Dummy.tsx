"use client"

import { useEffect, useState } from "react"

interface incomingData{
    Sr_No: number,
    Political_Party: String,
    Prefix: String,
    Bond_Number: number,
    Denominations: number,
    date_of_purchase: Date,
    purchaser: String,
    issue_branch_code: number,
    state: String
}

function Dummy() {

    const [data, setData] = useState<incomingData[]>([])

    useEffect(() => {
        fetch('http://localhost:3000/api/user').then((response) => response.json()).
            then((data) => {
                setData(data)
            })
    }, [])

    return (
        <div>
            from dummy
            {data.map((item) => {
            return (
                <div key={item.Bond_Number}>
                    {item.Bond_Number}
                </div>
            )
            })}
        </div>
    )
}
export default Dummy