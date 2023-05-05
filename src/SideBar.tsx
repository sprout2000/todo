import { memo } from 'react';

import Icon from '@mui/material/Icon';
import List from '@mui/material/List';
import Avatar from '@mui/material/Avatar';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';

import { styled } from '@mui/material/styles';
import { indigo, lightBlue, pink } from '@mui/material/colors';

import i18next from 'i18next';
import pjson from '../package.json';

type Props = {
  drawerOpen: boolean;
  onToggleQR: () => void;
  onToggleDrawer: () => void;
  onSort: (filter: Filter) => void;
};

const DrawerList = styled('div')(() => ({
  width: 250,
}));

const DrawerHeader = styled('div')(() => ({
  height: 150,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '1em',
  backgroundColor: indigo[500],
  color: '#ffffff',
  fontFamily: '-apple-system, BlinkMacSystemFont, Roboto, sans-serif',
}));

const DrawerAvatar = styled(Avatar)(({ theme }) => ({
  backgroundColor: pink[500],
  width: theme.spacing(6),
  height: theme.spacing(6),
}));

export const SideBar = memo((props: Props) => (
  <Drawer
    variant="temporary"
    open={props.drawerOpen}
    onClose={props.onToggleDrawer}
  >
    <DrawerList role="presentation" onClick={props.onToggleDrawer}>
      <DrawerHeader>
        <DrawerAvatar>
          <Icon>create</Icon>
        </DrawerAvatar>
        <p>TODO v{pjson.version}</p>
      </DrawerHeader>
      <List>
        <ListItem disablePadding>
          <ListItemButton
            aria-label="list-all"
            onClick={() => props.onSort('all')}
          >
            <ListItemIcon>
              <Icon>subject</Icon>
            </ListItemIcon>
            <ListItemText secondary={i18next.t('all')} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton
            aria-label="list-unchecked"
            onClick={() => props.onSort('unchecked')}
          >
            <ListItemIcon>
              <Icon sx={{ color: lightBlue[500] }}>radio_button_unchecked</Icon>
            </ListItemIcon>
            <ListItemText secondary={i18next.t('current')} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton
            aria-label="list-checked"
            onClick={() => props.onSort('checked')}
          >
            <ListItemIcon>
              <Icon sx={{ color: pink.A200 }}>check_circle_outline</Icon>
            </ListItemIcon>
            <ListItemText secondary={i18next.t('finished')} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton
            aria-label="list-removed"
            onClick={() => props.onSort('removed')}
          >
            <ListItemIcon>
              <Icon>delete</Icon>
            </ListItemIcon>
            <ListItemText secondary={i18next.t('trash')} />
          </ListItemButton>
        </ListItem>
        <Divider />
        <ListItem disablePadding>
          <ListItemButton aria-label="list-share" onClick={props.onToggleQR}>
            <ListItemIcon>
              <Icon>share</Icon>
            </ListItemIcon>
            <ListItemText secondary={i18next.t('share')} />
          </ListItemButton>
        </ListItem>
      </List>
    </DrawerList>
  </Drawer>
));

SideBar.displayName = 'SideBar';
