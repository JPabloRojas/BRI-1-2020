/* eslint-disable import/order */
// @ts-nocheck
/* eslint-disable import/no-unresolved */
import { createStore, compose, combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import { createContext } from 'react';
import localForage from 'localforage';
// project
import { clone } from 'utils/functions';
import enhancers, { sagaMiddleware } from './middleware';
// reducers

import app from 'commons/reducer';
import body from 'screens/Body/reducer'
//-----------------------------------------------------------

export const ReactReduxContext = createContext({});

export default function configureStore(initialState = {}) {
  const persistConfig = {
    key: 'root',
    storage: localForage,
    whitelist: [],
  };

  // create reducer
  const reducers = combineReducers({
    app,
    body
  });

  const pReducer = persistReducer(persistConfig, reducers);

  const store = createStore(pReducer, initialState, compose(enhancers));

  // Extensions
  store.runSaga = sagaMiddleware.run;
  store.injectedSagas = {}; // Saga registry

  return store;
}
