import React from "react";
import {
  BrowserRouter,
  Route,
  Routes
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "../Home/Home";
import Login from "../Login/Login";
import Register from "../Register/Register";
import VerifierEmail from "../VerifierEmail/VerifierEmail";
import ConfimerEmail from "../ConfimerEmail/ConfimerEmail";
import ConfirmInstagram from "../ConfimerInstagram/ConfirmInstagram";
import PageNotFound from "../PageNotFound/PageNotFound";

import AdminRoute from "./ProtectedRouter/AdminRoute";
import ClientRoute from "./ProtectedRouter/Client/ClientRoute";
import ViewClientRoute from "./ProtectedRouter/Client/ViewClientRoute";
import EditClientRoute from "./ProtectedRouter/Client/EditClientRoute";
import AddClientRoute from "./ProtectedRouter/Client/AddClientRoute";
import CampagneRoute from "./ProtectedRouter/Campagne/CampagneRoute";
import ViewCampagneRoute from "./ProtectedRouter/Campagne/ViewCampagneRoute";
import EditCampagneRoute from "./ProtectedRouter/Campagne/EditCampagneRoute";
import AddCampagneRoute from "./ProtectedRouter/Campagne/AddCampagneRoute";
import GalerieCampagneRoute from "./ProtectedRouter/GalerieCampagne/GalerieCampagneRoute";
import InfluenceurRoute from "./ProtectedRouter/Influenceur/InfluenceurRoute";
import ViewInfluenceurRoute from "./ProtectedRouter/Influenceur/ViewInfluenceurRoute";
import EditInfluenceurRoute from "./ProtectedRouter/Influenceur/EditInfluenceurRoute";
import LangueRoute from "./ProtectedRouter/Langue/LangueRoute";
import AddLangueRoute from "./ProtectedRouter/Langue/AddLangueRoute";
import InteretRoute from "./ProtectedRouter/Interet/InteretRoute";
import AddInteretRoute from "./ProtectedRouter/Interet/AddInteretRoute";
import EtatPaimentRoute from "./ProtectedRouter/EtatPaiment/EtatPaimentRoute";
import EditEtatPaimentRoute from "./ProtectedRouter/EtatPaiment/EditEtatPaimentRoute";
import AddEtatPaimentRoute from "./ProtectedRouter/EtatPaiment/AddEtatPaimentRoute";
import OffreRoute from "./ProtectedRouter/Offre/OffreRoute";
import ProfilHomeRoute from "./ProtectedRouter/Profil/ProfilHomeRoute";
import EditProfilRoute from "./ProtectedRouter/Profil/EditProfilRoute";
import ProfilNewOffreRoute from "./ProtectedRouter/Profil/ProfilNewOffreRoute";
import ProfilHistoryOffreRoute from "./ProtectedRouter/Profil/ProfilHisrotyOffreRoute";
//!------------------------------------------------------------------
import CompeleteProfil from "../CompeleteProfil/CompeleteProfil";
import Influenceur from "../Dashboard/Tables/Influenceur/Influenceur";
import DetailsHistoryOffreRoute from "./ProtectedRouter/Profil/DetailsHistoryOffreRoute";
import DetailsNewOffreRoute from "./ProtectedRouter/Profil/DetailsNewOffreRoute";
import AddOffreRoute from "./ProtectedRouter/Offre/AddOffreRoute";

//!--------------------------------------------------------------------
function Routers() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/register/verifierEmail" element={<VerifierEmail />} />
        <Route path="/register/confirmEmail" element={<ConfimerEmail />} />
        <Route
          path="/register/confirmInstagram"
          element={<ConfirmInstagram />}
        />
        <Route
          path="/register/completeProfil"
          element={<CompeleteProfil />}
        />
       

        {/************************************************************ */}
        <Route path="/dashboard/home" element={<AdminRoute />} />
        {/*Client table */}
        <Route path="/dashboard/client" element={<ClientRoute />} />
        <Route
          path="/dashboard/client/view/:id"
          element={<ViewClientRoute />}
        />
        <Route
          path="/dashboard/client/edit/:id"
          element={<EditClientRoute />}
        />
        <Route path="/dashboard/client/add" element={<AddClientRoute />} />

        {/*Campagne table */}
        <Route path="/dashboard/campagne" element={<CampagneRoute/>} />
        <Route
          path="/dashboard/campagne/view/:id"
          element={<ViewCampagneRoute />}
        />
        <Route
          path="/dashboard/campagne/edit/:id"
          element={<EditCampagneRoute />}
        />
        <Route path="/dashboard/campagne/add" element={<AddCampagneRoute />} />
        {/*Galerie Campage */}
        <Route
          path="/dashboard/galerieCampagne"
          element={<GalerieCampagneRoute />}
        />

        {/*table influenceur */}
        <Route path="/dashboard/influenceur" element={<Influenceur/>} />
        <Route
          path="/dashboard/influenceur/view/:id"
          element={<ViewInfluenceurRoute />}
        />
        <Route
          path="/dashboard/influenceur/edit/:id"
          element={<EditInfluenceurRoute />}
        />
        {/* table langue */}
        <Route path="/dashboard/langue" element={<LangueRoute />} />
        <Route path="/dashboard/langue/add" element={<AddLangueRoute />} />
        {/* table Interet */}
        <Route path="/dashboard/interet" element={<InteretRoute />} />
        <Route path="/dashboard/interet/add" element={<AddInteretRoute />} />
        {/*add Etat Paiment*/}
        <Route path="/dashboard/etatPaiment" element={<EtatPaimentRoute />} />
        <Route
          path="/dashboard/etatPaiment/edit/:campagneId/:influenceurId"
          element={<EditEtatPaimentRoute />}
        />
        <Route
          path="/dashboard/etatPaiment/add"
          element={<AddEtatPaimentRoute />}
        />

        {/*Offre */}
        <Route path="/dashboard/offre" element={<OffreRoute />} />
        <Route path="/dashboard/offre/add" element={<AddOffreRoute />} />

        {/**************************************** */}
        {/*profil */}
        <Route path="/profil/home" element={<ProfilHomeRoute/>} />
        <Route path="/profil/edit/:id" element={<EditProfilRoute/>} />
        <Route path="/profil/newOffre" element={<ProfilNewOffreRoute />} />
        <Route
          path="/profil/historyOffre"
          element={<ProfilHistoryOffreRoute/>}
        />
 
        <Route 
        path="/profil/historyOffre/details/:idUser/:idOffre" 
        element={<DetailsHistoryOffreRoute/>} />
        <Route 
        path="/profil/newOffre/details/:idUser/:idOffre" 
        element={<DetailsNewOffreRoute/>} />

        {/*indefined page */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Routers;
