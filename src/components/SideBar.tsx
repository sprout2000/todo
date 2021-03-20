import React from 'react';

/** Drawer and List */
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';

/** Colors */
import { indigo, lightBlue, pink } from '@material-ui/core/colors';

/** Icons */
import CreateIcon from '@material-ui/icons/CreateRounded';
import SubjectIcon from '@material-ui/icons/Subject';
import DeleteIcon from '@material-ui/icons/Delete';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import CheckCircleIcon from '@material-ui/icons/CheckCircleOutline';
import ShareIcon from '@material-ui/icons/Share';

/** Styles */
import makeStyles from '@material-ui/core/styles/makeStyles';
import createStyles from '@material-ui/core/styles/createStyles';

/** Resources */
import pjson from '../../package.json';

/** Types for Filter */
import { Filter } from '../lib/Filter';

interface Props {
  drawerOpen: boolean;
  onQROpen: () => void;
  toggleDrawer: () => void;
  handleOnSort: (filter: Filter) => void;
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

export const SideBar: React.FC<Props> = (props) => {
  const classes = useStyles();

  return (
    <Drawer
      variant="temporary"
      open={props.drawerOpen}
      onClose={props.toggleDrawer}>
      <div
        className={classes.list}
        role="presentation"
        onClick={props.toggleDrawer}>
        <div className={classes.drawerHeader}>
          <Avatar className={classes.avatar}>
            <CreateIcon />
          </Avatar>
          <p>TODO v{pjson.version}</p>
        </div>
        <List>
          <ListItem button onClick={() => props.handleOnSort('all')}>
            <ListItemIcon>
              <SubjectIcon />
            </ListItemIcon>
            <ListItemText secondary="すべてのタスク" />
          </ListItem>
          <ListItem button onClick={() => props.handleOnSort('incomplete')}>
            <ListItemIcon>
              <RadioButtonUncheckedIcon className={classes.todo} />
            </ListItemIcon>
            <ListItemText secondary="マイタスク" />
          </ListItem>
          <ListItem button onClick={() => props.handleOnSort('complete')}>
            <ListItemIcon>
              <CheckCircleIcon className={classes.complete} />
            </ListItemIcon>
            <ListItemText secondary="完了したタスク" />
          </ListItem>
          <ListItem button onClick={() => props.handleOnSort('removed')}>
            <ListItemIcon>
              <DeleteIcon />
            </ListItemIcon>
            <ListItemText secondary="ごみ箱" />
          </ListItem>
          <Divider />
          <ListItem button onClick={props.onQROpen}>
            <ListItemIcon>
              <ShareIcon className={classes.share} />
            </ListItemIcon>
            <ListItemText secondary="このアプリを共有" />
          </ListItem>
        </List>
      </div>
    </Drawer>
  );
};
