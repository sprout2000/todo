import React from 'react';
import i18next from 'i18next';

import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import indigo from '@material-ui/core/colors/indigo';
import lightBlue from '@material-ui/core/colors/lightBlue';
import pink from '@material-ui/core/colors/pink';

import SubjectIcon from '@material-ui/icons/Subject';
import DeleteIcon from '@material-ui/icons/Delete';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import CheckCircleIcon from '@material-ui/icons/CheckCircleOutline';

import { createStyles, makeStyles } from '@material-ui/core/styles';

import Icon from './icon-48.png';
import pjson from '../package.json';

interface Props {
  drawerOpen: boolean;
  toggleDrawer: Function;
  handleOnSort: Function;
}

const useStyles = makeStyles(() =>
  createStyles({
    drawerHeader: {
      height: 120,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '1em',
      backgroundColor: indigo[300],
      color: '#ffffff',
      fontFamily: '-apple-system, BlinkMacSystemFont, Roboto, sans-serif',
    },
    list: {
      width: 250,
      color: '#666',
    },
    todo: {
      color: lightBlue[500],
    },
    complete: {
      color: pink.A200,
    },
  })
);

const Drawer = (props: Props): JSX.Element => {
  const classes = useStyles();

  return (
    <SwipeableDrawer
      open={props.drawerOpen}
      onClose={(): void => props.toggleDrawer(false)}
      onOpen={(): void => props.toggleDrawer(true)}>
      <div
        className={classes.list}
        role="presentation"
        onClick={(): void => props.toggleDrawer(false)}>
        <div className={classes.drawerHeader}>
          <img src={Icon} width={48} />
          <p>TODO v{pjson.version}</p>
        </div>
        <List>
          <ListItem button onClick={(): void => props.handleOnSort('all')}>
            <ListItemIcon>
              <SubjectIcon />
            </ListItemIcon>
            <ListItemText primary={i18next.t('all')} />
          </ListItem>
          <ListItem
            button
            onClick={(): void => props.handleOnSort('incomplete')}>
            <ListItemIcon>
              <RadioButtonUncheckedIcon className={classes.todo} />
            </ListItemIcon>
            <ListItemText primary={i18next.t('incomplete')} />
          </ListItem>
          <ListItem button onClick={(): void => props.handleOnSort('complete')}>
            <ListItemIcon>
              <CheckCircleIcon className={classes.complete} />
            </ListItemIcon>
            <ListItemText primary={i18next.t('complete')} />
          </ListItem>
          <ListItem button onClick={(): void => props.handleOnSort('removed')}>
            <ListItemIcon>
              <DeleteIcon />
            </ListItemIcon>
            <ListItemText primary={i18next.t('trash')} />
          </ListItem>
          <Divider />
        </List>
      </div>
    </SwipeableDrawer>
  );
};

export default Drawer;
