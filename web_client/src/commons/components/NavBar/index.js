// @ts-nocheck
import React from 'react';
// material
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
// icons
import MenuIcon from '@material-ui/icons/Menu';
// styles
import styles from './styles';

const useStyles = makeStyles(styles);

const NavBar = props => {
  const classes = useStyles();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          Sintomatic
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
