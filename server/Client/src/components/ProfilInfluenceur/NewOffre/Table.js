import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getOneInfluenceurUserId } from '../../../redux/actions/influenceur.actions';
import { AccepterOffre, getNewOffre, RefuserOffre } from '../../../redux/actions/offre.actions';

function Table({name,fieldsTable,id}) {
  const dispatch = useDispatch();
  const {loading,newOffreData} = useSelector((state) => state.offre);
  const {oneInfluenceurData}=useSelector(state=>state.influenceur);

  useEffect(() => {
    getOneInfluenceurUserId(id,dispatch);
   }, [id]);
   
  useEffect(() => {
    getNewOffre(oneInfluenceurData?.id,dispatch);
  }, [oneInfluenceurData?.id]);

  //*=======================================
   const handleChangeAccepter=(e,idCampagne)=>{
    if(oneInfluenceurData?.id){
      e.preventDefault();
      AccepterOffre(idCampagne,oneInfluenceurData?.id,dispatch)
    }
   }

   const handleChangeRefuser=(e,idCampagne)=>{
    if(oneInfluenceurData?.id){
      e.preventDefault();
      RefuserOffre(idCampagne,oneInfluenceurData?.id,dispatch)
     }
    
    }

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
                <th scope="col" width="50">
                  Action
                </th>
              </tr>
            </thead> 
            <tbody>
              {newOffreData?.map((ele, index) => {
                return (
                  <tr key={index + 1} className="text-center">
                    <td key={index + 1} className="text-warning">
                      {index + 1 < 10 ? "0" + (index + 1) : index + 1}
                    </td>
                    <td>{ele.CampagneId}</td>
                    <td>{ele.InfluenceurId}</td>
                    <td>{   
                       ele.status==="En cours traitement" && <div className="btn btn-warning">{ele.status}</div>                      
                      }
                      </td> 
                      <td width="250">
                        <a 
                         onClick={(e)=>handleChangeAccepter(e,ele.CampagneId)}
                        className='btn btn-success' 
                        style={{marginRight:"10px"}}
                        >Accepter</a>
                        <a 
                        onClick={(e)=>handleChangeRefuser(e,ele.CampagneId)}
                        className='btn btn-danger'
                        >Refuser</a>
                      </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
       </div>
    
    </div>
   </>
  )
}

export default Table