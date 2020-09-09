// @ts-nocheck
/* eslint-disable import/no-unresolved */
import React from 'react';
import { withRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
// Project
import { appActions } from 'commons/reducer';
import { actionProps, selectState } from 'utils/reduxActions';
import { ReactReduxContext } from 'config/configureStore';
import connectSaga from 'utils/saga';
import Paths from 'utils/paths';
import PrivateRoute from 'utils/hooks/PrivateRoute';
import saga from '../commons/saga';
// containers
import Home from 'screens/Home';
// styles
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import teal from '@material-ui/core/colors/teal';
import Body from 'screens/Body';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: teal[600],
    },
    secondary: {
      main: teal[900],
    },
  }
});

theme.typography.fontFamily = {
  useNextVariants: true,
  fontFamily: [
    'Roboto'
  ]
};
theme.typography.body1 = {
  fontFamily: [
    'Roboto'
  ],
  color: '#545d65'
}
theme.typography.body2 = {
  fontFamily: [
    'Roboto'
  ],
  color: '#545d65'
}
theme.typography.h3 = {
  fontFamily: [
    'Roboto'
  ],
  color: '#545d65',
  fontSize: '40px'
};
theme.typography.h5 = {
  fontFamily: [
    'Roboto'
  ],
  color: '#545d65',
  fontSize: '20px'
};


const App = (props) => (
  <ThemeProvider theme={theme}>
    {/* <PrivateRoute exact path={Paths.HOME} component={Home} /> */}
    <PrivateRoute exact path={Paths.HOME} component={Body} />
    {/* Maintainers */}
  </ThemeProvider>
);

// ------------------ CONFIG CONTAINER ------------------

const withSaga = connectSaga({ key: 'sagaApp', saga });

const withConnect = connect(
  selectState(
    'app.user',
  ),
  actionProps(appActions),
  null,
  { context: ReactReduxContext },
);

export default compose(
  withRouter,
  withConnect,
)(withSaga(App));
