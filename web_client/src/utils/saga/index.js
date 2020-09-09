// @ts-nocheck
/* eslint-disable import/no-unresolved */
import React from 'react';
import { ReactReduxContext } from 'config/configureStore';
import { clone, falsy } from 'utils/functions';

const connectSaga = ({ key, saga }) =>
  WrappedComponent =>
    props => (
      <ReactReduxContext.Consumer>
        {
          value => {
            // Inject the new saga
            if (falsy(value.store.injectedSagas[key])) {
              value.store.injectedSagas = clone(
                clone.OBJECT,
                value.store.injectedSagas,
                { [key]: value.store.runSaga(saga) }
              );
            }

            return (<WrappedComponent {...props} />);
          }
        }
      </ReactReduxContext.Consumer>
    );

export default connectSaga;
