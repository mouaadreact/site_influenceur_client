import React, { useEffect, useState } from 'react'
import Chart from './Chart'
import {useDispatch,useSelector} from 'react-redux'
import { getTarifOfInfluenceur } from '../../../../redux/actions/etatPaiment.actions';

function EtatPaimentStatistics() {
  const dispatch = useDispatch();
  const {tarifOfInfluenceur} = useSelector((state) => state.etatPaiment);

  useEffect(() => {
    getTarifOfInfluenceur(dispatch);
  }, []);

  const userData = {
    labels: tarifOfInfluenceur.map((data) => data.instagramUsernameCompte),
    datasets: [
      {
        label: "tarif of influenceur",
        data: tarifOfInfluenceur.map((data) => data.somme),
        backgroundColor: ["#01579b", "#D800A6"],
      },
    ],
  };

  return (
    <div style={{ width: "700px" }}>
      <Chart chartData={userData} />
    </div>
  );
}

export default EtatPaimentStatistics;
