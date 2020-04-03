import React from 'react';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import makeStyles from '@material-ui/core/styles/makeStyles';
import createStyles from '@material-ui/core/styles/createStyles';

interface Props {
  title: string;
  toggleDrawer: Function;
}

const useStyles = makeStyles((theme) =>
  createStyles({
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
      fontFamily: '-apple-system, BlinkMacSystemFont, Roboto, sans-serif',
    },
  })
);

const ToolBar = (props: Props): JSX.Element => {
  const classes = useStyles();

  return (
    <AppBar position="sticky">
      <Toolbar>
        <IconButton
          onClick={(): void => props.toggleDrawer()}
          edge="start"
          className={classes.menuButton}
          color="inherit"
          aria-label="menu">
          <MenuIcon />
        </IconButton>
        <Typography className={classes.title}>{props.title}</Typography>
      </Toolbar>
    </AppBar>
  );
};

export default ToolBar;
