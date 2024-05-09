

export const barBaseOption = {
    title: {
        text: 'Fund Received',  // Your title text here
        textStyle: {
            fontWeight: 'bold', // Makes the title text bold
            fontSize: 20,        // Adjusts the title font size
        },
        left: 'center',
        top:15
    },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      // Use axis to trigger tooltip
      type: 'shadow' // 'shadow' as default; can also be 'line' or 'shadow'
        },
    formatter: function (params:any) {
            // params is an array if trigger is 'axis', or a single object if trigger is 'item'
        let tip = '';
            params.forEach(function (item:any) {
                // Assuming value is a number and formatted as needed
                if (item.value.toFixed(2) > 1) {
                    tip += item.marker + item.name + ': ' + item.value.toFixed(2) + ' crores<br/>'
                } else {
                    tip += item.marker + item.name + ': ' + (item.value*100).toFixed(2) + ' lakhs<br/'
                }
            });
            return tip;
        },
    textStyle: {
            fontWeight: 'bold', // Make text bold
            fontSize: 14,      // Change font size as needed
        }
  },
    legend: {
      show:false
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: {
      type: 'value',
      min: 0,
      max: 'dataMax',
      splitNumber: 5,
      axisLabel: {
          formatter: function (params:any) {
              return params + " cr";
          }
      }
  },
  yAxis: {
      type: 'category',
      axisLabel: {
          inside: true,
          fontSize: 15,
          width: 300,
          overflow: 'truncate',
          ellipsis:"..."
      },
      nameTruncate: {
          maxWidth:40
      },
      inverse:true
  },
    series: [
        {
            name: 'Total Fund Received',
            type: 'bar',
            itemStyle: {
                color: '#15aabf ',
                opacity: 0.5
            },
        }
    ]
};
