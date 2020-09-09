// @ts-nocheck
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
// Utils
import configureStore, { ReactReduxContext } from './config/configureStore';
import 'fontsource-roboto';
// components
import App from './App';
// styles
import './commons/assets/styles.scss';
// sentry
import * as Sentry from '@sentry/react';
Sentry.init({dsn: ""});

const store = configureStore();
const persistor = persistStore(store);

const renderApp = () => render(
  <Provider store={store} context={ReactReduxContext}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <App context={ReactReduxContext} />
      </BrowserRouter>
    </PersistGate>
  </Provider>,
  document.querySelector('#root'),
);

renderApp();

if (process.env.NODE_ENV !== 'production') {
  if (module.hot) {
    // Support hot reloading of components
    // and display an overlay for runtime errors
    module.hot.accept('./App', () => {
      renderApp();
    });
  }
}

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js');
  });
} else {
  console.log('serviceWorker not available');
}
