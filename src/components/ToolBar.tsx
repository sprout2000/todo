import React, { Dispatch, memo } from 'react';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import makeStyles from '@material-ui/core/styles/makeStyles';
import createStyles from '@material-ui/core/styles/createStyles';

import { Action } from '../lib/Action';

interface Props {
  title: string;
  drawerOpen: boolean;
  dispatch: Dispatch<Action>;
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

export const ToolBar: React.FC<Props> = memo(
  ({ title, drawerOpen, dispatch }) => {
    const classes = useStyles();

    return (
      <AppBar position="sticky">
        <Toolbar>
          <IconButton
            onClick={() => dispatch({ type: 'drawer', value: !drawerOpen })}
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography data-testid="title" className={classes.title}>
            {title}
          </Typography>
        </Toolbar>
      </AppBar>
    );
  }
);

ToolBar.displayName = 'ToolBar';
