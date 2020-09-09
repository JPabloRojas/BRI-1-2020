/* eslint-disable no-param-reassign */
// @ts-nocheck
/* eslint-disable import/no-unresolved */
/* eslint-disable import/order */
import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Grid from '@material-ui/core/Grid';

// Project
import { selectState, actionProps } from 'utils/reduxActions';
import { ReactReduxContext } from 'config/configureStore';
import connectSaga from 'utils/saga';
import saga from './saga';
import './styles.scss';
import styles from './styles';
import {
  Container,
  withStyles,
  Popover,
  Typography,
  Divider,
  ListItem,
  ListItemText,
  TextField,
  Chip,
  Card,
  Button,
  Stepper,
  StepLabel,
  Step,
} from '@material-ui/core';
import Male from 'commons/components/Bodys/Male';
import { bodyActions } from './reducer';
import { truthty } from 'utils/functions';

const SelectorMenu = props => (
  <Popover
    style={{ marginLeft: 20 }}
    open={props.menuOpen}
    anchorEl={props.anchorEl}
    onClose={() => props.setMenuOpen(false)}
    anchorOrigin={{
      vertical: 'center',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'left',
    }}
  >
    <Grid container spacing={0} style={{ padding: 10 }}>
      <Grid item xs={12}>
        <Typography component='h4'>{props.actualPart.name}</Typography>
        <Divider style={{ marginTop: 4 }} />
      </Grid>
    </Grid>
    <Grid container>
      {truthty(props.actualPart.id) &&
        props.symptoms[props.actualPart.id]
          .filter(item => !props.selectedSymptoms.includes(item))
          .map(item => (
            <ListItem
              button
              onClick={() => props.setSelectedSymptoms([...props.selectedSymptoms, item])}
              style={{ paddingRight: 10, paddingLeft: 10, paddingTop: 5, paddingBottom: 5 }}
            >
              <ListItemText primary={item}></ListItemText>{' '}
            </ListItem>
          ))}
    </Grid>
  </Popover>
);

const WelcomeStep = props => (
  <Grid container spacing={3} className={props.classes.container}>
    BIENVENIDAAAAA
    <Button color='primary' variant='contained' className={props.classes.nextButton} onClick={() => props.setStep(1)}>
      Comenzar
    </Button>
  </Grid>
);

const InitialInformationStep = props => (
  <Grid container spacing={3} className={props.classes.container}>
    <Grid item xs={6}>
      Formulariooooooo
    </Grid>
    <Button
      color='primary'
      variant='contained'
      className={props.classes.nextButton}
      onClick={props.saveInitialInformation}
    >
      Siguiente
    </Button>
  </Grid>
);

const BodyStep = props => (
  <Grid container spacing={3} className={props.classes.container}>
    <Grid item xs={6}>
      <Male controls={props.controls} actions={props.actions} onClickPart={props.onClickPart} />
    </Grid>
    <Grid item xs={6}>
      <Grid container spacing={3} className={props.classes.container}>
        <Grid item xs={12}>
          <TextField variant='outlined' label='Ingreses sus síntomas' />
        </Grid>
        <Grid item xs={12}>
          {props.selectedSymptoms.map(item => (
            <Chip style={{ margin: 2 }} color='primary' label={item} onDelete={() => props.deleteSymptom(item)} />
          ))}
        </Grid>
      </Grid>
    </Grid>
    <Button color='primary' variant='contained' className={props.classes.nextButton} onClick={props.saveSymptoms}>
      Siguiente
    </Button>
  </Grid>
);

const ResultsStep = props => (
  <Grid container spacing={3} className={props.classes.container}>
    <Grid item xs={6}></Grid>
  </Grid>
);

const DetailStep = props => (
  <Grid container spacing={3} className={props.classes.container}>
    <Grid item xs={6}></Grid>
    <Button color='primary' variant='contained' className={props.classes.nextButton} onClick={() => props.setStep(4)}>
      Siguiente
    </Button>
  </Grid>
);

const Body = props => {
  const { controls, actions, symptoms } = props;
  const [anchorEl, setAnchorEl] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [actualPart, setActualPart] = useState({ name: '', id: '' });
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [step, setStep] = useState(0);

  useEffect(() => {
    actions.getSymptoms();
  }, []);

  const onClickPart = e => {
    setMenuOpen(true);
    setAnchorEl(e.currentTarget);
    setActualPart({ name: e.target.getAttribute('name'), id: e.target.id });
  };

  const deleteSymptom = item => setSelectedSymptoms(selectedSymptoms.filter(s => item !== s));

  const saveInitialInformation = () => {
    // guardar informacion
    setStep(2);
  };

  const saveSymptoms = () => {
    // guardar sintomas
    setStep(3);
  };

  return (
    <Container maxWidth={false}>
      <SelectorMenu
        setSelectedSymptoms={setSelectedSymptoms}
        selectedSymptoms={selectedSymptoms}
        setMenuOpen={setMenuOpen}
        actualPart={actualPart}
        anchorEl={anchorEl}
        menuOpen={menuOpen}
        symptoms={symptoms}
      />
      <Grid container spacing={3} className={props.classes.container}>
        <Grid item xs={12}>
          {/* Card content */}
          <Card style={{ position: 'relative', minHeight: '50vh' }}>
            {step === 0 && <WelcomeStep classes={props.classes} setStep={setStep} />}
            {step === 1 && (
              <InitialInformationStep classes={props.classes} saveInitialInformation={saveInitialInformation} />
            )}
            {step === 2 && (
              <BodyStep
                selectedSymptoms={selectedSymptoms}
                deleteSymptom={deleteSymptom}
                saveSymptoms={saveSymptoms}
                onClickPart={onClickPart}
                controls={controls}
                classes={props.classes}
              />
            )}
            {step === 3 && <DetailStep classes={props.classes} setStep={setStep} />}
            {step === 4 && <ResultsStep classes={props.classes} />}
          </Card>

          {/* STEPS */}
          <Stepper alternativeLabel activeStep={step} style={{ backgroundColor: 'transparentﬂ' }}>
            {['Bienvenido', 'Informacion básica', 'Seleccionar síntomas', 'Detalles', 'Resultados'].map(label => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Grid>
      </Grid>
    </Container>
  );
};

const withSaga = connectSaga({ key: 'sagaBody', saga });

const withConnect = connect(
  selectState('body.controls', 'body.symptoms'),
  actionProps(Object.assign({}, bodyActions)),
  null,
  {
    context: ReactReduxContext,
  },
);

export default compose(withStyles(styles), withRouter, withConnect)(withSaga(Body));
