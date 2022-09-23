import React from 'react'
import {Bar} from 'react-chartjs-2'
import {Chart as ChartJS} from 'chart.js/auto'

function Chart({chartData}) {
  return (
   <>
   <Bar 
  style={{
      backgroundColor:"#FFF",
      padding:"10px",
      boxShadow:"rgb(0 0 0) 3px 4px 18px"
      }} 
     className="rounded"  
   data={chartData} />
   </>
  )
}

export default Chart