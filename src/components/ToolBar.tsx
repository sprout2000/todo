import React, { useContext, memo } from 'react';
import i18next from 'i18next';

import AppBar from '@material-ui/core/AppBar';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';

import makeStyles from '@material-ui/core/styles/makeStyles';
import createStyles from '@material-ui/core/styles/createStyles';

import { AppContext } from './App';

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

export const ToolBar: React.FC = memo(() => {
  const classes = useStyles();
  const { state, dispatch } = useContext(AppContext);

  const setTitle = () => {
    switch (state.filter) {
      case 'all':
        return i18next.t('all');
      case 'complete':
        return i18next.t('complete');
      case 'incomplete':
        return i18next.t('incomplete');
      case 'removed':
        return i18next.t('trash');
      default:
        return i18next.t('all');
    }
  };

  return (
    <AppBar position="sticky">
      <Toolbar>
        <IconButton
          onClick={() => dispatch({ type: 'drawer', value: !state.drawerOpen })}
          edge="start"
          className={classes.menuButton}
          color="inherit"
          aria-label="menu"
        >
          <MenuIcon />
        </IconButton>
        <Typography data-testid="title" className={classes.title}>
          {setTitle()}
        </Typography>
      </Toolbar>
    </AppBar>
  );
});

ToolBar.displayName = 'ToolBar';
