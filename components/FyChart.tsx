"use client"

import React, { useEffect, useState } from 'react'
import { fybarOptions } from '../utils/fyBarOptions'
import ReactECharts from 'echarts-for-react'

function FyChart() {
    const [options, setOptions] = useState(fybarOptions)

    useEffect(() => {
        
        fetch("http://localhost:3001/staticData/state", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        }).then(res => res.json())
            .then(data => {
               setOptions({
                   ...fybarOptions,
                   xAxis: {
                       type: "category",
                       data: data.map(item=>item.name)
                   },
                   series: [{
                       ...fybarOptions.series[0],
                       data: data.map(item => item.value),
                   }],
                   yAxis: {
                       type: 'value',
                       axisLabel: {
                           formatter: function (params) {
                           console.log("params", params)
                           return parseInt(params) / 10000000 + "cr"
                        }
                    }   
                   },
                   tooltip: {
                       trigger: 'axis',
                       formatter: function (params) {
                           let tip =""
                           params.forEach((item) => {
                               let value = parseInt(item.value)
                               console.log(value)
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