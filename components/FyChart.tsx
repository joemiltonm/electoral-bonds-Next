"use client"

import React, { useEffect, useState } from 'react'
import { fybarOptions } from '../utils/fyBarOptions'
import ReactECharts from 'echarts-for-react'

function FyChart() {
    const [options, setOptions] = useState(fybarOptions)

    useEffect(() => {
        
        fetch("/api/FYdata").then(res => res.json())
            .then(data => {
               setOptions({
                   ...fybarOptions,
                   xAxis: {
                       type: "category",
                       data: data.map((item:any)=>item.name)
                   },
                   series: [{
                       ...fybarOptions.series[0],
                       data: data.map((item:any) => item.value),
                   }],
                   yAxis: {
                       type: 'value',
                       axisLabel: {
                           formatter: function (params:any) {
                           return parseInt(params) / 10000000 + "cr"
                        }
                    }   
                   },
                   tooltip: {
                       trigger: 'axis',
                       formatter: function (params:any) {
                           let tip =""
                           params.forEach((item:any) => {
                               let value = parseInt(item.value)
                               return tip += (value / 10000000).toFixed(2) + " cr"
                           })
                           return tip
                        }
                   }
            })
        })
    }
        
        
        
        , [])

  return (
    <ReactECharts option={options} style={{height:330, marginTop:0}}></ReactECharts>
  )
}

export default FyChart