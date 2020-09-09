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
import Autocomplete from '@material-ui/lab/Autocomplete';
import Slider from '@material-ui/core/Slider';

import Logo from '../../commons/assets/cough.png';
import Edad from '../edad';
import Gender from '../gender';
import ReactStars from 'react-rating-stars-component';

import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import Happy from '../../commons/assets/emotion.png';
import Sad from '../../commons/assets/hurt.png';

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
  List,
  ListItemAvatar,
} from '@material-ui/core';
import Male from 'commons/components/Bodys/Male';
import { bodyActions } from './reducer';
import { truthty, formatDate, falsy } from 'utils/functions';

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
  <Grid container justify='center' spacing={3} className={props.classes.container}>
    <Grid item xs={12}>
      <Typography style={{ textAlign: 'center', fontSize: 28, fontWeight: 500, fontStyle: 'italic' }}>
        Sintomatic
      </Typography>
    </Grid>
    <img src={Logo} alt='logo' className='rounded mx-auto d-block' style={{ height: '150px' }} />
    <Grid item xs={12}>
      <Typography style={{ textAlign: 'center', fontSize: 20, fontWeight: 300, fontStyle: 'italic' }}>
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
      <Grid container xs={12} md={12}>
        <Grid item xs={6} lg={6}>
          <Typography style={{ fontSize: 20, fontWeight: 400, fontStyle: 'italic' }}>¡Conozcamonos un poco!</Typography>
        </Grid>
        <Grid item xs={6} lg={6}>
          <Typography style={{ fontSize: 20, fontWeight: 400, fontStyle: 'italic' }}>
            ¿Por dónde buscamos al médico indicado?
          </Typography>
        </Grid>
      </Grid>
      <Grid container xs={12} md={12} direction='row' alignItems='center' style={{ marginTop: '20px' }} spacing={1}>
        <Grid item xs={3} lg={4} style={{ maxHeight: '100%' }}>
          <Edad></Edad>
        </Grid>
        <Grid item xs={3} lg={2} style={{ maxHeight: '100%' }}>
          <Gender></Gender>
        </Grid>
        <Grid item xs={4} lg={4} style={{ maxHeight: '100%' }}>
          <FormControl style={{ width: '95%' }}>
            <InputLabel htmlFor='input-with-icon-adornment'>Ubicación</InputLabel>
            <Input
              id='ubication'
              startAdornment={
                <InputAdornment position='start'>
                  <RoomIcon />
                </InputAdornment>
              }
            />
          </FormControl>
        </Grid>
        <Grid item xs={2} lg={2} style={{ maxHeight: '100%' }}>
          <FormControl>
            <InputLabel htmlFor='input-with-icon-adornment'>Número</InputLabel>
            <Input
              id='door'
              startAdornment={
                <InputAdornment position='start'>
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
      <Typography style={{ fontSize: 20, fontWeight: 400, fontStyle: 'italic', textAlign: 'center' }}>
        Identifiquemos tus síntomas
      </Typography>
    </Grid>
    <Grid item xs={6}></Grid>
    <Grid item xs={6}>
      <Male controls={props.controls} actions={props.actions} onClickPart={props.onClickPart} />
    </Grid>
    <Grid item xs={6}>
      <Grid container spacing={3} className={props.classes.container}>
        <Grid item xs={12}>
          <Autocomplete
            id='tags-outlined'
            options={props.symptoms}
            getOptionLabel={option => option}
            renderInput={params => <TextField {...params} variant='outlined' label='Busca tus síntomas' />}
            onChange={(event, newValue) => {
              truthty(newValue) && props.setSelectedSymptoms([...props.selectedSymptoms, newValue]);
            }}
          />
          {/* <Autocomplete
            id='combo-box-demo'
            options={props.symptoms}
            getOptionLabel={option => option}
            style={{ width: 300 }}
            renderInput={params => <TextField {...params} label='Busca tus síntomas' variant='outlined' value='' />}
            onClick={e => props.setSelectedSymptoms([...props.selectedSymptoms, e.target.value])}
          /> */}
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

    <Button
      color='primary'
      variant='contained'
      className={props.classes.nextButton}
      onClick={props.saveSymptoms}
      disabled={props.selectedSymptoms.length === 0}
    >
      Siguiente
    </Button>
  </Grid>
);

const marks = [
  {
    value: 1,
    label: 'Sutil',
  },
  {
    value: 2,
    label: 'Leve',
  },
  {
    value: 3,
    label: 'Moderado',
  },
  {
    value: 4,
    label: 'Intenso',
  },
  {
    value: 5,
    label: 'Muy intenso',
  },
];

const DetailStep = props => (
  <Grid container spacing={3} className={props.classes.container} style={{ marginBottom: 30 }}>
    <Grid item xs={12}>
      <Typography style={{ fontSize: 26, fontWeight: 400, fontStyle: 'italic' }}>
        ¿Cuál es la intensidad de tus síntomas?
      </Typography>

      {props.selectedSymptoms.map(item => (
        <Grid container xs={12} style={{ marginTop: 20 }}>
          <Grid item xs={6} style={{ fontStyle: 'normal', fontSize: 22, textAlign: 'center', marginTop: 10 }}>
            {item}
          </Grid>
          <Grid item xs={1} style={{ textAlign: 'center' }}>
            <img src={Happy} alt='logo' className='rounded mx-auto d-block' style={{ height: '50px' }} />
          </Grid>
          <Grid item xs={4} style={{ textAlign: 'center', marginTop: 10 }}>
            <Slider
              defaultValue={3}
              aria-labelledby='discrete-slider'
              valueLabelDisplay='auto'
              step={1}
              marks={marks}
              min={1}
              max={5}
              width={100}
            />
          </Grid>
          <Grid item xs={1} style={{ textAlign: 'center' }}>
            <img src={Sad} alt='logo' className='rounded mx-auto d-block' style={{ height: '50px' }} />
          </Grid>
        </Grid>
      ))}
    </Grid>

    <Button color='primary' variant='contained' className={props.classes.home} onClick={() => props.setStep(0)}>
      <HomeIcon></HomeIcon>
    </Button>

    <Button color='primary' variant='contained' className={props.classes.nextButton} onClick={() => props.setStep(4)}>
      Siguiente
    </Button>
  </Grid>
);

const ResultsStep = props => {
  return (
    <Grid container spacing={3} className={props.classes.container}>
      <Grid item xs={12}>
        <Typography style={{ textAlign: 'center', fontSize: 28, fontWeight: 500, fontStyle: 'italic' }}>
          Tenemos los especialistas para ti!
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <List>
          {props.results
            .sort((a, b) => b.info.opinion_stats.total - a.info.opinion_stats.total)
            .map(item => (
              <ListItem divider>
                <ListItemAvatar>
                  <img src={item.info.photo.small_url} />
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Grid container spacing={1} style={{ marginLeft: 20 }}>
                      <Grid item xs={9}>
                        <Typography style={{ fontWeight: 400 }}>{item.info.full_name}</Typography>
                        <Typography color='primary' style={{ fontWeight: 700 }}>
                          <AssignmentIndIcon style={{ position: 'relative', top: '5px', marginRight: '2px' }} />{' '}
                          {item.info._embedded.specializations._items.map(item => item.name).join(' - ')}
                        </Typography>
                        <Typography style={{ fontWeight: 500 }}>
                          <LocationOnIcon style={{ position: 'relative', top: '5px', marginRight: '2px' }} />{' '}
                          {item.info.city_name}
                        </Typography>
                      </Grid>
                      <Grid item xs={3}>
                        <Grid container spacing={1} justify='center'>
                          <ReactStars count={5} edit={false} value={item.info.stars} size={24} activeColor='#ffd700' />
                          <Grid item xs={12}>
                            <Typography style={{ textAlign: 'center' }}>
                              {item.info.opinion_stats.total} opiniones
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  }
                  secondary={
                    <Grid container spacing={1} style={{ marginLeft: 20 }}>
                      <Grid item xs={12}>
                        <Typography color='primary' style={{ fontWeight: 700 }}>
                          <EventAvailableIcon style={{ position: 'relative', top: '5px', marginRight: '2px' }} /> Hora
                          más cercana disponible
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Button
                          variant='contained'
                          color='primary'
                          onClick={() => window.open(item.dates._nearest.link)}
                        >
                          {`${formatDate(new Date(item.dates._nearest.start))} - ${new Date(
                            item.dates._nearest.start,
                          ).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} hrs`}
                        </Button>
                      </Grid>
                    </Grid>
                  }
                />
              </ListItem>
            ))}
        </List>
      </Grid>
    </Grid>
  );
};

const Body = props => {
  const { controls, actions, symptoms, results } = props;
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

  const getSintomas = symtoms => {
    let list = [];
    symtoms['chest'].map(item => list.push(item));
    symtoms['ears'].map(item => list.push(item));
    symtoms['eyes'].map(item => list.push(item));
    symtoms['foot'].map(item => list.push(item));
    symtoms['foreArm'].map(item => list.push(item));
    symtoms['hands'].map(item => list.push(item));
    symtoms['head'].map(item => list.push(item));
    symtoms['knees'].map(item => list.push(item));
    symtoms['lowerAbdomen'].map(item => list.push(item));
    symtoms['lowerLeg'].map(item => list.push(item));
    symtoms['midAbdomen'].map(item => list.push(item));
    symtoms['neck'].map(item => list.push(item));
    symtoms['nose'].map(item => list.push(item));
    symtoms['oralCavity'].map(item => list.push(item));
    symtoms['sexualOrgans'].map(item => list.push(item));
    symtoms['thighs'].map(item => list.push(item));
    symtoms['upperAbdomen'].map(item => list.push(item));
    symtoms['upperArm'].map(item => list.push(item));
    return list;
  };

  const shuffle = arr => {
    const newArr = arr.slice();
    for (let i = newArr.length - 1; i > 0; i--) {
      const rand = Math.floor(Math.random() * (i + 1));
      [newArr[i], newArr[rand]] = [newArr[rand], newArr[i]];
    }
    return newArr;
  };

  const shuffleResults = shuffle(results).slice(0, 5);

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
              <InitialInformationStep
                classes={props.classes}
                saveInitialInformation={saveInitialInformation}
                setStep={setStep}
              />
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
                symptoms={getSintomas(symptoms)}
                setSelectedSymptoms={setSelectedSymptoms}
              />
            )}
            {step === 3 && <DetailStep classes={props.classes} setStep={setStep} selectedSymptoms={selectedSymptoms} />}
            {step === 4 && <ResultsStep classes={props.classes} setStep={setStep} results={shuffleResults} />}
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
  selectState('body.controls', 'body.symptoms', 'body.results'),
  actionProps(Object.assign({}, bodyActions)),
  null,
  {
    context: ReactReduxContext,
  },
);

export default compose(withStyles(styles), withRouter, withConnect)(withSaga(Body));
