import React from 'react';

/** MUI Components */
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

/** Styles */
import makeStyles from '@material-ui/core/styles/makeStyles';
import createStyles from '@material-ui/core/styles/createStyles';

interface Props {
  title: string;
  toggleDrawer: () => void;
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

export const ToolBar: React.FC<Props> = (props) => {
  const classes = useStyles();

  return (
    <AppBar position="sticky">
      <Toolbar>
        <IconButton
          onClick={props.toggleDrawer}
          edge="start"
          className={classes.menuButton}
          color="inherit"
          aria-label="menu">
          <MenuIcon />
        </IconButton>
        <Typography data-testid="title" className={classes.title}>
          {props.title}
        </Typography>
      </Toolbar>
    </AppBar>
  );
};
