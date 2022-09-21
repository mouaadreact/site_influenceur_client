import React from 'react'
import {Bar} from 'react-chartjs-2'
import {Chart as ChartJS} from 'chart.js/auto'

function Chart({chartData}) { 
  return (
    <>
      <Bar style={{backgroundColor:"#FFF",padding:"10px"}} data={chartData} />
    </>
  )
}

export default Chart