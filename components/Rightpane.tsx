"use client"

import React from 'react'
import { useState, useEffect } from 'react';
import EChartsReact from 'echarts-for-react';
import { barBaseOption } from '../utils/barBaseoptions';

export default function Rightpane() {

    const [options, setOptions] = useState({});

    useEffect(() => {

        setOptions(barBaseOption)

        fetch("http://localhost:3001/staticData/total", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        }).then(res => res.json()).then(data => {
            const { formattedData } = data;
            const name = formattedData.map(item => item.name) 
            const value = formattedData.map(item => item.value)  
            setOptions({
                ...barBaseOption,
                yAxis: { ...barBaseOption, data: name },
                series: [{
                    ...barBaseOption.series[0], data: value
                }]
            })
        })
    },[])


    return (
        <div style={{height:'1200px', width : 380, marginLeft:20}}>
            <EChartsReact style={{height:'800px'}} option={options}/>                    
        </div>
    )
}
