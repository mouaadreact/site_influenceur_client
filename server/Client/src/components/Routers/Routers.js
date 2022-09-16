import React, { useEffect } from "react";
import {
  BrowserRouter,
  Route,
  Routes,
  useHistory,
  useNavigate,
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
import Admin from "../Dashboard/Admin";
import Client from "../Dashboard/Tables/Client/Client";
import ViewClient from "../Dashboard/Tables/Client/ViewClient";
import AddClient from "../Dashboard/Tables/Client/AddClient";
import Campagne from "../Dashboard/Tables/Campagne/Campagne";
import ViewCampagne from "../Dashboard/Tables/Campagne/ViewCampagne";
import EditCampagne from "../Dashboard/Tables/Campagne/EditCampagne";
import AddCampagne from "../Dashboard/Tables/Campagne/AddCampagne";
import GalerieCampagne from "../Dashboard/Tables/GalerieCampagne/GalerieCampagne";
import Influenceur from "../Dashboard/Tables/Influenceur/Influenceur";
import ViewInfluenceur from "../Dashboard/Tables/Influenceur/ViewInfluenceur";
import EditInfluenceur from "../Dashboard/Tables/Influenceur/EditInfluenceur";
import Langue from "../Dashboard/Tables/Langue/Langue";
import AddLangue from "../Dashboard/Tables/Langue/AddLangue";
import Interet from "../Dashboard/Tables/Interet/Interet";
import AddInteret from "../Dashboard/Tables/Interet/AddInteret";
import EtatPaiment from "../Dashboard/Tables/EtatPaiment/EtatPaiment";
import EditEtatPaiment from "../Dashboard/Tables/EtatPaiment/EditEtatPaiment";
import AddEtatPaiment from "../Dashboard/Tables/EtatPaiment/AddEtatPaiment";
import Offre from "../Dashboard/Tables/Offre/Offre";
import EditProfil from "../ProfilInfluenceur/EditProfil/EditProfil";
import NewOffre from "../ProfilInfluenceur/NewOffre/NewOffre";
import HistoryOffre from "../ProfilInfluenceur/HistoryOffre/HistoryOffre";
import ProfilInfluenceur from "../ProfilInfluenceur/ProfilInfluenceur";
import AddOffre from "../Dashboard/Tables/Offre/AddOffre";
import EditClient from "../Dashboard/Tables/Client/EditClient";

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
        <Route path="/dashboard/home" element={<Admin />} />
        {/*Client table */}
        <Route path="/dashboard/client" element={<Client />} />
        <Route
          path="/dashboard/client/view/:id"
          element={<ViewClient />}
        />
        <Route
          path="/dashboard/client/edit/:id"
          element={<EditClient />}
        />
        <Route path="/dashboard/client/add" element={<AddClient />} />

        {/*Campagne table */}
        <Route path="/dashboard/campagne" element={<Campagne/>} />
        <Route
          path="/dashboard/campagne/view/:id"
          element={<ViewCampagne />}
        />
        <Route
          path="/dashboard/campagne/edit/:id"
          element={<EditCampagne />}
        />
        <Route path="/dashboard/campagne/add" element={<AddCampagne />} />
        {/*Galerie Campage */}
        <Route
          path="/dashboard/galerieCampagne"
          element={<GalerieCampagne />}
        />

        {/*table influenceur */}
        <Route path="/dashboard/influenceur" element={<Influenceur/>} />
        <Route
          path="/dashboard/influenceur/view/:id"
          element={<ViewInfluenceur/>}
        />
        <Route
          path="/dashboard/influenceur/edit/:id"
          element={<EditInfluenceur/>}
        />
        {/* table langue */}
        <Route path="/dashboard/langue" element={<Langue/>} />
        <Route path="/dashboard/langue/add" element={<AddLangue/>} />
        {/* table Interet */}
        <Route path="/dashboard/interet" element={<Interet/>} />
        <Route path="/dashboard/interet/add" element={<AddInteret/>} />
        {/*add Etat Paiment*/}
        <Route path="/dashboard/etatPaiment" element={<EtatPaiment />} />
        <Route
          path="/dashboard/etatPaiment/edit/:campagneId/:influenceurId"
          element={<EditEtatPaiment/>}
        />
        <Route
          path="/dashboard/etatPaiment/add"
          element={<AddEtatPaiment />}
        />

        {/*Offre */}
        <Route path="/dashboard/offre" element={<Offre/>} />
        <Route path="/dashboard/offre/add" element={<AddOffre/>} />

        {/**************************************** */}
        {/*profil */}
        <Route path="/profil/home" element={<ProfilInfluenceur/>} />
        <Route path="/profil/edit/:id" element={<EditProfil/>} />
        <Route path="/profil/newOffre" element={<NewOffre />} />
        <Route
          path="/profil/historyOffre"
          element={<HistoryOffre/>}
        />

        {/*indefined page */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Routers;
