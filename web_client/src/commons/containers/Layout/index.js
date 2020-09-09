// @ts-nocheck
import React, { Fragment, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
// Project
import { appActions } from 'commons/reducer';
import { actionProps, selectState } from 'utils/reduxActions';
import { ReactReduxContext } from 'config/configureStore';
import connectSaga from 'utils/saga';
import saga from 'commons/saga';
// material
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import Grid from '@material-ui/core/Grid';
// components
import NavBar from 'commons/components/NavBar';

function Alert(props) {
  return <MuiAlert elevation={6} variant='filled' {...props} />;
}

function logOut() {
  localStorage.clear();
  if (process.env.NODE_ENV !== 'production') {
    window.location.href = 'http://localhost:5000/logout';
  } else {
    window.location.href = `${window.location.origin}/logout`;
  }
}

const Layout = props => {
  function toggleDrawer() {
    props.actions.toggleDrawer();
  }

  function toggleError() {
    props.actions.toggleError();
  }

  function toggleSuccess() {
    props.actions.toggleSuccess();
  }

  function handleItemClick(module) {
    return () => {
      props.history.push(module);
      props.actions.toggleDrawer();
    };
  }

  return (
    <Fragment>
      <NavBar logOut={logOut} toggleDrawer={toggleDrawer} />
      {/* <SideBar
        isOpen={props.drawerIsOpen}
        toggleDrawer={toggleDrawer}
        handleItemClick={handleItemClick}
      /> */}
      <div className='content-container'>
        <Grid container justify='center'>
          <Grid container item md={11} sm={12}>
            {props.children}
          </Grid>
        </Grid>
      </div>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={props.error}
        autoHideDuration={3000}
        onClose={toggleError}
      >
        <Alert onClose={toggleError} severity='error'>
          {props.errorMsg}
        </Alert>
      </Snackbar>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={props.success}
        autoHideDuration={3000}
        onClose={toggleSuccess}
      >
        <Alert onClose={toggleSuccess} severity='success'>
          {props.successMsg}
        </Alert>
      </Snackbar>
    </Fragment>
  );
};

// ------------------ CONFIG CONTAINER ------------------

const withSaga = connectSaga({ key: 'sagaApp', saga });

const withConnect = connect(
  selectState(
    'app.drawerIsOpen',
    'app.deviceError',
    'app.device',
    'app.errorMsg',
    'app.error',
    'app.successMsg',
    'app.success',
  ),
  actionProps(appActions),
  null,
  { context: ReactReduxContext },
);

export default compose(withRouter, withConnect)(withSaga(Layout));
