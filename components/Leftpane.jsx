'use client'
import React, { useState, useEffect } from 'react'
import { barBaseOption } from '../utils/barBaseoptions';
import EChartsReact from 'echarts-for-react';


export default function Leftpane() {

    const [options, setOptions] = useState({});

    useEffect(() => {

        setOptions(barBaseOption)

        fetch('http://localhost:3000/api/bond').then(res => res.json()).then(data => {
            const { formattedDataPurchase } = data;
            console.log("purchaseProportion",formattedDataPurchase)
            const name = formattedDataPurchase.map(item => item.name) 
            const value = formattedDataPurchase.map(item => item.value)  
            setOptions({
                ...barBaseOption,
                title: {
                    ...barBaseOption.title,
                    text: 'Top Donors',
                },
                yAxis: { ...barBaseOption.yAxis, data: name.slice(0, 19) },
                grid: {
                    right: '6%' 
                    },
                series: [{
                    ...barBaseOption.series[0],
                    data: value.slice(0, 19),
                    itemStyle: {
                        color: '#e03131',
                        opacity:0.5}
                }],
                tooltip: {
                    ...barBaseOption.tooltip,
                   position: function (point, params, dom, rect, size) {
                        // Check if 'rect' is not null
                        if (rect) {
                            // Calculate tooltip position here
                            return [rect.x + rect.width + 5, point[1]];
                        }
                        // Fallback position if rect is null
                        return [point[0], point[1]];
                    }
                }
            })
        })
    },[])


    return (
        <div style={{height:'1200px', width : '350px', marginLeft:20, marginRight:0}}>
            <EChartsReact style={{height:'800px', width:'330px', marginRight:0}} option={options}/>                    
        </div>
    )
}