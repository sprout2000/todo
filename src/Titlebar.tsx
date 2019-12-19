import React from 'react';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import Drawer from './Drawer';

interface Props {
  toggleDrawer: Function;
  drawerOpen: boolean;
  handleOnSort: Function;
  title: string;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    titlebar: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    toolbar: {
      backgroundColor: '#ff375f',
    },
  })
);

const Titlebar = (props: Props): JSX.Element => {
  const classes = useStyles();

  return (
    <div className={classes.titlebar}>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            onClick={(): void => props.toggleDrawer(true)}
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title}>{props.title}</Typography>
        </Toolbar>
      </AppBar>
      <Drawer {...props} />
    </div>
  );
};

export default Titlebar;
