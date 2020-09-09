/* eslint-disable import/no-unresolved */
// @ts-nocheck
import React from 'react';
import { ReactReduxContext } from 'config/configureStore';
import { Route, Redirect } from 'react-router-dom';
import { truthty } from 'utils/functions';
import Layout from 'commons/containers/Layout';

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      component={props => (
        <Layout>
          <Component {...props} context={ReactReduxContext} />
        </Layout>
      )}
    />
  );
};

export default PrivateRoute;
