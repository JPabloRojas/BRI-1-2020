/* eslint-disable no-param-reassign */
// @ts-nocheck
/* eslint-disable import/no-unresolved */
/* eslint-disable import/order */
import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Grid from '@material-ui/core/Grid';
import HomeIcon from '@material-ui/icons/Home';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import RoomIcon from '@material-ui/icons/Room';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';

import Logo from "../../commons/assets/cough.png";
import Edad from "../edad";
import Gender from "../gender";

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
  <Grid container justify="center" spacing={3} className={props.classes.container}>
    <Grid item xs={12} >
      
      <Typography style={{textAlign: "center", fontSize: 28, fontWeight:500, fontStyle:"italic"}}>
          Sintomatic
      </Typography>
        
    </Grid>
    <img src={Logo} alt="logo" className="rounded mx-auto d-block" style={{ height: "150px"}}/>  
    <Grid item xs={12} >
      
      <Typography style={{textAlign: "center", fontSize: 20, fontWeight:300, fontStyle:"italic"}}>
          Identifiquemos juntos el especilista indicado para ti
      </Typography>
        
    </Grid>

    <Button color='primary' variant='contained' className={props.classes.nextButton} onClick={() => props.setStep(1)}>
      Comenzar
    </Button>
  </Grid>
);

const InitialInformationStep = props => (
  <Grid container className={props.classes.container}>
    <Grid item xs={12}>
        <Typography style={{fontSize: 20, fontWeight:400, fontStyle:"italic"}}>
            ¡Conozcamonos un poco!
        </Typography>

        <Grid container xs={12} md={12}
            direction="row"
            alignItems="center"
            style={{ marginTop: "20px"}}
            spacing={1}>
            <Grid item xs={4} lg={4} style={{maxHeight: '100%'}}>
            <Edad></Edad> 
            </Grid>
            <Grid item xs={4} lg={2} style={{maxHeight: '100%'}}>
            <Gender></Gender>
            </Grid>
            <Grid item xs={4} lg={4} style={{maxHeight: '100%'}}>
                <FormControl style={{width:"95%"}}>
                  <InputLabel htmlFor="input-with-icon-adornment">Ubicación</InputLabel>
                  <Input
                    id="ubication"
                    startAdornment={
                      <InputAdornment position="start">
                        <RoomIcon />
                      </InputAdornment>
                    }
                  />
                </FormControl>
            </Grid>
            <Grid item xs={4} lg={2} style={{maxHeight: '100%'}}>
              <FormControl>
                <InputLabel htmlFor="input-with-icon-adornment">Número</InputLabel>
                <Input
                  id="door"
                  startAdornment={
                    <InputAdornment position="start">
                      <MeetingRoomIcon />
                    </InputAdornment>
                  }
                />
              </FormControl>
            </Grid>
        </Grid>
        
        

    </Grid>


    <Button color='primary' variant='contained' className={props.classes.home} onClick={() => props.setStep(0)}>
      <HomeIcon></HomeIcon>
    </Button>

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

    <Button color='primary' variant='contained' className={props.classes.home} onClick={() => props.setStep(0)}>
      <HomeIcon></HomeIcon>
    </Button>

    <Button color='primary' variant='contained' className={props.classes.nextButton} onClick={props.saveSymptoms}>
      Siguiente
    </Button>
  </Grid>
);

const ResultsStep = props => {
  return (
    <Grid container spacing={3} className={props.classes.container}>
      <Grid item xs={12}></Grid>
    </Grid>
  );
};

const DetailStep = props => (
  <Grid container spacing={3} className={props.classes.container}>
    <Grid item xs={6}></Grid>

    <Button color='primary' variant='contained' className={props.classes.home} onClick={() => props.setStep(0)}>
      <HomeIcon></HomeIcon>
    </Button>

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

  useEffect(() => {
    if (step === 4) {
      actions.getResults(selectedSymptoms.join(' '));
    }
  }, [step]);

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
              <InitialInformationStep classes={props.classes} saveInitialInformation={saveInitialInformation} setStep={setStep}/>
            )}
            {step === 2 && (
              <BodyStep
                selectedSymptoms={selectedSymptoms}
                deleteSymptom={deleteSymptom}
                saveSymptoms={saveSymptoms}
                onClickPart={onClickPart}
                controls={controls}
                classes={props.classes}
                setStep={setStep}
              />
            )}
            {step === 3 && <DetailStep classes={props.classes} setStep={setStep} />}
            {step === 4 && <ResultsStep classes={props.classes} setStep={setStep} />}
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
