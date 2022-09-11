import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getOneInfluenceurUserId } from '../../../redux/actions/influenceur.actions';
import { getNewOffre, getOffreAccepter } from '../../../redux/actions/offre.actions';

function Table({name,fieldsTable,id}) {
  const dispatch = useDispatch();
  const {loading,historyOffreData} = useSelector((state) => state.offre);
  const {oneInfluenceurData}=useSelector(state=>state.influenceur);

  useEffect(() => {
    getOneInfluenceurUserId(id,dispatch);
   }, [id]);
   
  useEffect(() => {
    getOffreAccepter(oneInfluenceurData?.id,dispatch);
  }, [oneInfluenceurData?.id]);


  return (
   <>
      
    <div className="container-fluid px-4">
      <div className="row my-5">
        <div className="card-hearder mb-3">
          <h4>
            {name} Table
            
          </h4>
        </div>

        <div className="col">
          <table className="table bg-white rounded shadow-sm  table-hover">
            <thead>
              <tr className="text-center">
                <th scope="col" className="text-warning" width="50">
                  ID
                </th>
                {fieldsTable.map((ele, index) => {
                  return (
                    <th key={index} scope="col">
                      {ele}
                    </th>
                  );
                })} 
              </tr>
            </thead>
            <tbody>
              {historyOffreData?.map((ele, index) => {
                return (
                  <tr key={index + 1} className="text-center">
                    <td key={index + 1} className="text-warning">
                      {index + 1 < 10 ? "0" + (index + 1) : index + 1}
                    </td>
                    <td>{ele.CampagneId}</td>
                    <td>{ele.InfluenceurId}</td>
                    <td>{   
                       ele.status==="Accepter" && <div className="btn btn-success">{ele.status}</div>                      
                      }
                      </td> 
                      
                  </tr>
                );
              })}
            </tbody>
          </table>

         <div className='d-flex justify-content-center'>
         <div class="row">

            <div class="col-sm-9 mb-4" style={{width:"900px"}}>
              <div class="card">
                <div class="card-body">
                  <h5 class="card-title">
                  <span>Campagne name : </span>
                     test
                  </h5>
                  <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                 <span>Status: </span>
                 <a 
                 class="btn btn-primary" 
                 style={{marginRight:"10px"}}>
                 Go somewhere</a>
                </div>
                </div>
            </div>

        </div>
         </div>


        </div>
       </div>
    
    </div>
   </>
  )
}

export default Table