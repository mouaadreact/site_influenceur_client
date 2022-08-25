import {configureStore} from '@reduxjs/toolkit';
import authReducer from './reducers/auth.reducer'
import clientReducer from './reducers/client.reducer';
import langueReducer from './reducers/langue.reducer';
import registerReducer from './reducers/register.reducer';

 const store=configureStore({
  reducer:{
   auth:authReducer,
   register:registerReducer,
   langue:langueReducer,
   client:clientReducer
  }
});

export default store;