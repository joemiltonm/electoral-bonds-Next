"use client"

import React from 'react'
import { useState, useEffect } from 'react';
import { baseOption } from '../utils/baseOption';
import ReactECharts from 'echarts-for-react';
import { Flex, Paper, Text, NumberFormatter } from '@mantine/core';
import FyChart from './FyChart';


export default function Dashboard() {
    const [options, setOptions] = useState(baseOption);
    const [total, setTotal] = useState(0);
    const [party, setParty] = useState(0);
    const [purchaser, setPurchaser] = useState(0);

    useEffect(() => {
        fetch("http://localhost:3000/api/bond").then(res => res.json()).then((data : any) => {
            const { formattedData, total, party, purchaser } = data;
            const top = formattedData.slice(0, 9)
            const last = formattedData.slice(10,)
            const value = last.reduce((a : any, b : any) => a + b.value, 0)

            top.push({name:"OTHERS COMBINED", value, itemStyle: { color: '#868e96' } })
            setOptions({
                ...baseOption, series: [{
                    ...baseOption.series[0], data: top
                }]
            })
            setTotal(total[0].total_amount/10000000)
            setParty(party.count)
            setPurchaser(purchaser.count)
        })},[])

    return (
        <>  
            
            <Flex justify="flex-start" direction="row">
                <div style={{ marginTop: 10, marginLeft: 10, width: 700}}>
                    <Paper shadow="md" radius="lg" withBorder p="xl" style={{ backgroundColor: '#f8f9fa'}}>
                        <ReactECharts style={{height:240}} option={options} />                        
                    </Paper>
                    
                </div>
                {/* <Card> */}
                    <Paper shadow="md" radius="lg" withBorder p="xl" style={{ backgroundColor: '#f8f9fa', width: '420px', height:'200px', marginLeft:8, marginTop:50}}>
                       <Text style={{ display: 'block', width:'400px', marginBottom:'8px' }}>
                            Total Bond Amount = <span style={{ marginRight: '0.25em' }}>₹</span>
                                <span><NumberFormatter 
                                    prefix=""
                                    decimalScale={2} 
                                    value={total} 
                                    thousandSeparator 
                                    //displayType={'text'}
                                    //renderText={(value : any) => <span style={{ marginRight: '0.25em' }}>{value}</span>}
                                />
                            crores</span>
                        </Text>
                        <Text style={{marginBottom:'8px'}}>Total Number of Political Party = {party}</Text>
                        <Text>Total Number of Purchasers = {purchaser}</Text>
                    </Paper>
                {/* </Card> */}
            </Flex>
            <Paper shadow="md" radius="lg" withBorder p="xl" style={{
                backgroundColor: '#f8f9fa',
                height: 350, width: 700, marginLeft: 10, marginTop: 10,
                paddingTop:5
            }}>
                <FyChart />
            </Paper>
        </>
    )
}

