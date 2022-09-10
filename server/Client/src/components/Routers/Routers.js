import React, { useEffect } from 'react'
import {BrowserRouter,Route,Routes,useHistory, useNavigate} from 'react-router-dom'

import Home from '../Home/Home'
import NavBar from '../NavBar/NavBar'
import Login from '../Login/Login'
import Register from '../Register/Register'
import VerifierEmail from '../VerifierEmail/VerifierEmail'
import ConfimerEmail from '../ConfimerEmail/ConfimerEmail'
import CompeleteProfil from '../CompeleteProfil/CompeleteProfil'
import ConfirmConditionGenerale from '../ConfirmConditionGenerale/ConfirmConditionGenerale'
import Admin from '../Dashboard/Admin'
import ProfilInfluenceur from '../ProfilInfluenceur/ProfilInfluenceur'
import ConfirmInstagram from '../ConfimerInstagram/ConfirmInstagram'
import Client from '../Dashboard/Tables/Client/Client'
import ViewClient from '../Dashboard/Tables/Client/ViewClient'
import EditClient from '../Dashboard/Tables/Client/EditClient'
import AddClient from '../Dashboard/Tables/Client/AddClient'

import Campagne from '../Dashboard/Tables/Campagne/Campagne'
import ViewCampagne from '../Dashboard/Tables/Campagne/ViewCampagne'
import EditCampagne from '../Dashboard/Tables/Campagne/EditCampagne'
import AddCampagne from '../Dashboard/Tables/Campagne/AddCampagne'

import GalerieCampagne from '../Dashboard/Tables/GalerieCampagne/GalerieCampagne'
import Influenceur from '../Dashboard/Tables/Influenceur/Influenceur'
import ViewInfluenceur from '../Dashboard/Tables/Influenceur/ViewInfluenceur'
import EditInfluenceur from '../Dashboard/Tables/Influenceur/EditInfluenceur'
import CompeleteProfilV2 from '../CompeleteProfil/CompeleteProfilV2'
import Redirect from '../Home/Redirect'
import Langue from '../Dashboard/Tables/Langue/Langue'
import AddLangue from '../Dashboard/Tables/Langue/AddLangue'
import Interet from '../Dashboard/Tables/Interet/Interet'
import AddInteret from '../Dashboard/Tables/Interet/AddInteret'
import EtatPaiment from '../Dashboard/Tables/EtatPaiment/EtatPaiment'
import EditEtatPaiment from '../Dashboard/Tables/EtatPaiment/EditEtatPaiment'
import AddEtatPaiment from '../Dashboard/Tables/EtatPaiment/AddEtatPaiment'


import NewOffre from '../ProfilInfluenceur/NewOffre/NewOffre'
import HistoryOffre from '../ProfilInfluenceur/HistoryOffre/HistoryOffre'
import EditProfil from '../ProfilInfluenceur/EditProfil/EditProfil'
import Offre from '../Dashboard/Tables/Offre/Offre'
function Routers() {

  return (

   <BrowserRouter>
        <NavBar/>
        <Routes>
          <Route path='/' element={<Redirect />} />
          <Route path='/home' element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path='/register' element={<Register/>} />
          <Route path='/register/verifierEmail' element={<VerifierEmail />} />
          <Route path='/register/confirmEmail' element={<ConfimerEmail/>} />
          <Route path='/register/confirmInstagram' element={<ConfirmInstagram/>} />
          <Route path='/register/completeProfil' element={<CompeleteProfilV2/>} />
          <Route path='/register/conditionGenrale' element={<ConfirmConditionGenerale/>} />
          <Route path='/dashboard/home' element={<Admin/>} />
          {/*Client table */}
          <Route path='/dashboard/client' element={<Client/>} />
          <Route path='/dashboard/client/view/:id' element={<ViewClient/>} />
          <Route path='/dashboard/client/edit/:id' element={<EditClient/>} />
          <Route path='/dashboard/client/add' element={<AddClient/>} />
          {/*Campagne table */}
          <Route path='/dashboard/campagne' element={<Campagne/>} />
          <Route path='/dashboard/campagne/view/:id' element={<ViewCampagne/>} />
          <Route path='/dashboard/campagne/edit/:id' element={<EditCampagne/>} />
          <Route path='/dashboard/campagne/add' element={<AddCampagne/>} />
          {/*Galerie Campage */}
          <Route path='/dashboard/galerieCampagne' element={<GalerieCampagne/>} />
          <Route path='/dashboard/galerieCampagne/add' element={<AddCampagne/>} />
          {/*table influenceur */}
          <Route path='/dashboard/influenceur' element={<Influenceur/>} />
          <Route path='/dashboard/influenceur/view/:id' element={<ViewInfluenceur/>} />
          <Route path='/dashboard/influenceur/edit/:id' element={<EditInfluenceur/>} />
          {/* table langue */}
          <Route path='/dashboard/langue' element={<Langue/>} />
          <Route path='/dashboard/langue/add' element={<AddLangue/>} />
          {/* table Interet */}
          <Route path='/dashboard/interet' element={<Interet/>} />
          <Route path='/dashboard/interet/add' element={<AddInteret/>} />
          {/*add Etat Paiment*/}
          <Route path='/dashboard/etatPaiment' element={<EtatPaiment/>} />
          <Route path='/dashboard/etatPaiment/edit/:campagneId/:influenceurId' element={<EditEtatPaiment/>} />
          <Route path='/dashboard/etatPaiment/add' element={<AddEtatPaiment/>} />

          {/*Offre */}
          <Route path='/dashboard/offre' element={<Offre/>} />

          {/**************************************** */}
          {/*profil */}
          <Route path='/profil/home' element={<ProfilInfluenceur/>} />
          <Route path='/profil/edit/:id' element={<EditProfil/>} />
          <Route path='/profil/newOffre' element={<NewOffre/>} />
          <Route path='/profil/historyOffre' element={<HistoryOffre/>} />

        </Routes>
     </BrowserRouter>
  )
}

export default Routers