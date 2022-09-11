import React, { useContext, useEffect } from 'react'
import {AiOutlineMenu} from 'react-icons/ai';
import { getCountCampagne } from '../../../redux/actions/campagne.actions';
import { useDispatch, useSelector} from 'react-redux';
import { getCountOffre } from '../../../redux/actions/offre.actions';
import { getCountInfluenceur } from '../../../redux/actions/influenceur.actions';
import { getCountClient } from '../../../redux/actions/client.actions';
import { UidContext } from '../../../contexts/AppContext';
import { getOneUser } from '../../../redux/actions/user.actions';

function Statistics() {
    const id = useContext(UidContext);
 const dispatch=useDispatch()

 const {countCampagne}=useSelector(state=>state.campagne)
 const {countClient}=useSelector(state=>state.client)
 const {countOffre}=useSelector(state=>state.offre)
 const {countInfluenceur}=useSelector(state=>state.influenceur)
 const {oneUserData}=useSelector(state=>state.user)

  useEffect(() => {
    getCountCampagne(dispatch);
    getCountOffre(dispatch);
    getCountClient(dispatch);
    getCountInfluenceur(dispatch);
  }, []);

  useEffect(()=>{
    getOneUser(id,dispatch);
  },[id])

  return (
     <div id="page-content-wrapper">
            <nav className="navbar navbar-expand-lg navbar-light bg-transparent py-4 px-4">
                <div className="d-flex align-items-center">
                    <AiOutlineMenu className="fas fa-align-left primary-text fs-4 me-3 disable text-dark " id="menu-toggle"/>
                    <h2 className="fs-2 m-0">Dashboard</h2>
                </div>

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                    aria-expanded="false" aria-label="Toggle navigation">
                    
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle second-text fw-bold" href="#" id="navbarDropdown"
                                role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                <i className="fas fa-user me-2"></i>{oneUserData.username}
                            </a>  
                        </li>
                    </ul>
                </div>
            </nav>

            <div className="container-fluid px-4">
                <div className="row g-3 my-2">
                    <div className="col-md-3">
                        <div className="p-3 bg-white shadow-sm d-flex justify-content-around align-items-center rounded">
                            <div>
                                <h3 className="fs-2">{
                                    countClient <10 ? "0"+countClient : countClient
                                    }</h3>
                                <p className="fs-5">Client</p>
                            </div>

                        </div>
                    </div>

                    <div className="col-md-3">
                        <div className="p-3 bg-white shadow-sm d-flex justify-content-around align-items-center rounded">
                            <div>
                            <h3 className="fs-2">{
                                    countCampagne <10 ? "0"+countCampagne : countCampagne
                                    }</h3>
                                <p className="fs-5">Campagne</p>
                            </div>
                             </div>
                    </div>

                    <div className="col-md-3">
                        <div className="p-3 bg-white shadow-sm d-flex justify-content-around align-items-center rounded">
                            <div>
                            <h3 className="fs-2">{
                                    countInfluenceur <10 ? 
                                    "0"+countInfluenceur
                                     : countInfluenceur
                                    }</h3>
                                <p className="fs-5">Influenceur</p>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-3">
                        <div className="p-3 bg-white shadow-sm d-flex justify-content-around align-items-center rounded">
                            <div>
                            <h3 className="fs-2">{
                                    countOffre <10 ? "0"+countOffre : countOffre
                                    }</h3>
                                <p className="fs-5">Offre</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row my-5">
                    <h3 className="fs-4 mb-3">Recent Orders</h3>
                    <div className="col">
                        <table className="table bg-white rounded shadow-sm  table-hover">
                            <thead>
                                <tr className="text-center">
                                    <th scope="col" width="50">#</th>
                                    <th scope="col">Product</th>
                                    <th scope="col">Customer</th>
                                    <th scope="col">Price</th>
                                    <th scope='col'>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="text-center">
                                    <th scope="row">1</th>
                                    <td>Television</td>
                                    <td>Jonny</td>
                                    <td>$1200</td>
                                    <td>
                                    <a href="#"  className="btn btn-warning text-white crud-btn" >edit</a>
                                    <a href="#"  className="btn btn-danger crud-btn">delete</a>
                                    <a href="#"  className="btn btn-success crud-btn">view</a>
                                    </td>
                                </tr>
                                <tr className="text-center">
                                    <th scope="row">2</th>
                                    <td>Laptop</td>
                                    <td>Kenny</td>
                                    <td>$750</td>
                                    <td>
                                    <a href="#"  className="btn btn-warning text-white crud-btn" >edit</a>
                                    <a href="#"  className="btn btn-danger crud-btn">delete</a>
                                    <a href="#"  className="btn btn-success crud-btn">view</a>
                                    </td>
                                </tr>
                                <tr className="text-center">
                                    <th scope="row">3</th>
                                    <td>Cell Phone</td>
                                    <td>Jenny</td>
                                    <td>$600</td>
                                    <td>
                                    <a href="#"  className="btn btn-warning text-white crud-btn" >edit</a>
                                    <a href="#"  className="btn btn-danger crud-btn">delete</a>
                                    <a href="#"  className="btn btn-success crud-btn">view</a>
                                    </td>
                                </tr>
                                <tr className="text-center">
                                    <th scope="row">4</th>
                                    <td>Fridge</td>
                                    <td>Killy</td>
                                    <td>$300</td>
                                    <td>
                                    <a href="#" className="btn btn-warning text-white crud-btn" >edit</a>
                                    <a href="#" className="btn btn-danger crud-btn">delete</a>
                                    <a href="#" className="btn btn-success crud-btn">view</a>
                                    </td>
                                </tr>
                                
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </div>
  )
}

export default Statistics