import React, { useEffect } from 'react'
import Chart from './Chart'
import {useDispatch,useSelector} from 'react-redux'
import { getTarifOfInfluenceur } from '../../../../redux/actions/etatPaiment.actions';
import { getOffreNombreEachMonth } from '../../../../redux/actions/offre.actions';

function OffreStatistics() {

 const dispatch = useDispatch();
 const { nombreOffreChaqueMonthYear} = useSelector((state) => state.offre);

 useEffect(() => {
  getOffreNombreEachMonth(dispatch)
 }, []);

 const userData = {
   labels:  nombreOffreChaqueMonthYear.map(
    (data) => 
    ((data.month<10?"0"+data.month:data.month)+"/"+data.year)),
   datasets: [
     {
       label: "nombre of offre each month",
       data:  nombreOffreChaqueMonthYear.map((data) => data.nombre),
       backgroundColor: ["#01579b", "#D800A6"]
     },
   ],
 };

  return (
   <div style={{ width: "700px" }}>
      <Chart chartData={userData} />
    </div>
  )
}

export default OffreStatistics