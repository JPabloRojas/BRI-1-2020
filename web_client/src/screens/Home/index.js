/* eslint-disable no-param-reassign */
// @ts-nocheck
/* eslint-disable import/no-unresolved */
/* eslint-disable import/order */
import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Grid from '@material-ui/core/Grid';

// Project
import { selectState, actionProps } from 'utils/reduxActions';
import { homeActions } from 'screens/Home/reducer';
import { ReactReduxContext } from 'config/configureStore';
import connectSaga from 'utils/saga';
import saga from './saga';

import './styles.scss';
import styles from './styles';
import { clone } from 'utils/functions';
import { Container, withStyles } from '@material-ui/core';
import Female from 'commons/components/Bodys/Female';
import Male from 'commons/components/Bodys/Male';

const Home = props => {
  // --------- Extra functions ----------------

  // --------Life Cycle functions ---------

  // ------------- onChange functions -------------

  // ------------- OnClick functions -----------------

  return (
    <Container maxWidth={false}>
      <Grid container spacing={3} className={props.classes.container}>
        <Grid item xs={12} style={{ height: '100vh', maxHeight: '100vh' }}>
            {/* <Female/> */}
            {/* <Male/> */}
        </Grid>
      </Grid>
    </Container>
  );
};

const withSaga = connectSaga({ key: 'sagaHome', saga });

const withConnect = connect(
  selectState('app.objects'),
  actionProps(Object.assign({}, homeActions)),
  null,
  { context: ReactReduxContext },
);

export default compose(withStyles(styles), withRouter, withConnect)(withSaga(Home));
