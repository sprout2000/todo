import React, { Dispatch, memo } from 'react';
import i18next from 'i18next';

import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';

import CreateIcon from '@material-ui/icons/CreateRounded';
import SubjectIcon from '@material-ui/icons/Subject';
import DeleteIcon from '@material-ui/icons/Delete';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import CheckCircleIcon from '@material-ui/icons/CheckCircleOutline';
import ShareIcon from '@material-ui/icons/Share';

import { indigo, lightBlue, pink } from '@material-ui/core/colors';
import makeStyles from '@material-ui/core/styles/makeStyles';
import createStyles from '@material-ui/core/styles/createStyles';

import pjson from '../../package.json';

import { Action } from '../lib/Action';

interface Props {
  drawerOpen: boolean;
  dispatch: Dispatch<Action>;
}

const useStyles = makeStyles((theme) =>
  createStyles({
    drawerHeader: {
      height: 150,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '1em',
      backgroundColor: indigo[500],
      color: '#ffffff',
      fontFamily: '-apple-system, BlinkMacSystemFont, Roboto, sans-serif',
    },
    avatar: {
      backgroundColor: pink[500],
      width: theme.spacing(6),
      height: theme.spacing(6),
    },
    list: {
      width: 250,
    },
    todo: {
      color: lightBlue[500],
    },
    complete: {
      color: pink.A200,
    },
    share: {
      color: indigo[500],
    },
  })
);

export const SideBar: React.FC<Props> = memo(({ drawerOpen, dispatch }) => {
  const classes = useStyles();

  return (
    <Drawer
      variant="temporary"
      open={drawerOpen}
      onClose={() => dispatch({ type: 'drawer', value: false })}
    >
      <div
        className={classes.list}
        role="presentation"
        onClick={() => dispatch({ type: 'drawer', value: !drawerOpen })}
      >
        <div className={classes.drawerHeader}>
          <Avatar className={classes.avatar}>
            <CreateIcon />
          </Avatar>
          <p>TODO v{pjson.version}</p>
        </div>
        <List>
          <ListItem
            button
            onClick={() => dispatch({ type: 'sort', value: 'all' })}
          >
            <ListItemIcon>
              <SubjectIcon />
            </ListItemIcon>
            <ListItemText secondary={i18next.t('all')} />
          </ListItem>
          <ListItem
            button
            onClick={() => dispatch({ type: 'sort', value: 'incomplete' })}
          >
            <ListItemIcon>
              <RadioButtonUncheckedIcon className={classes.todo} />
            </ListItemIcon>
            <ListItemText secondary={i18next.t('incomplete')} />
          </ListItem>
          <ListItem
            button
            onClick={() => dispatch({ type: 'sort', value: 'complete' })}
          >
            <ListItemIcon>
              <CheckCircleIcon className={classes.complete} />
            </ListItemIcon>
            <ListItemText secondary={i18next.t('complete')} />
          </ListItem>
          <ListItem
            button
            onClick={() => dispatch({ type: 'sort', value: 'removed' })}
          >
            <ListItemIcon>
              <DeleteIcon />
            </ListItemIcon>
            <ListItemText secondary={i18next.t('trash')} />
          </ListItem>
          <Divider />
          <ListItem
            button
            onClick={() => dispatch({ type: 'qr', value: true })}
          >
            <ListItemIcon>
              <ShareIcon className={classes.share} />
            </ListItemIcon>
            <ListItemText secondary={i18next.t('share')} />
          </ListItem>
        </List>
      </div>
    </Drawer>
  );
});

SideBar.displayName = 'SideBar';
