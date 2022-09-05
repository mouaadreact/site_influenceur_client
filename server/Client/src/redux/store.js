import {configureStore} from '@reduxjs/toolkit';
import apiInstagramHistoryReducer from './reducers/apiInstagramHistory.reducer';
import authReducer from './reducers/auth.reducer'
import campagneReducer from './reducers/campagne.reducer';
import clientReducer from './reducers/client.reducer';
import filterReducer from './reducers/filter.reducer';
import galerieCampagneReducer from './reducers/galerieCampagne.reducer';
import influenceurReducer from './reducers/influenceur.reducer';
import interetReducer from './reducers/interet.reducer';
import langueReducer from './reducers/langue.reducer';
import registerReducer from './reducers/register.reducer';

 const store=configureStore({
  reducer:{
   auth:authReducer,
   register:registerReducer,
   langue:langueReducer, 
   client:clientReducer,
   campagne:campagneReducer,
   interet:interetReducer,
   galerieCampagne:galerieCampagneReducer,
   filter:filterReducer,
   influenceur:influenceurReducer,
   apiInstagram:apiInstagramHistoryReducer
  }
});

export default store;