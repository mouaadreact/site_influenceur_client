import {configureStore} from '@reduxjs/toolkit';
import authReducer from './reducers/auth.reducer'
import langueReducer from './reducers/langue.reducer';
import registerReducer from './reducers/register.reducer';

 const store=configureStore({
  reducer:{
   auth:authReducer,
   register:registerReducer,
   langue:langueReducer
  }
});

export default store;