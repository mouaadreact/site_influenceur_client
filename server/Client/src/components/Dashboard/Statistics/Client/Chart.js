import React from 'react'
import {Bar, Line} from 'react-chartjs-2'
import {Chart as ChartJS} from 'chart.js/auto'

function Chart({chartData}) {
  console.log(chartData)
  return (
    <>
     <Line style={{backgroundColor:"#FFF",padding:"10px"}} data={chartData} />
    </>
  )
}

export default Chart