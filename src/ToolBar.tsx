import { memo } from 'react';

import Box from '@mui/material/Box';
import Icon from '@mui/material/Icon';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import i18next from 'i18next';

type Props = {
  filter: Filter;
  onToggleDrawer: () => void;
};

export const translator = (arg: Filter) => {
  switch (arg) {
    case 'all':
      return i18next.t('all');
    case 'unchecked':
      return i18next.t('current');
    case 'checked':
      return i18next.t('finished');
    case 'removed':
      return i18next.t('trash');
    default:
      return 'TODO';
  }
};

export const ToolBar = memo((props: Props) => (
  <Box sx={{ flexGrow: 1 }}>
    <AppBar position="static">
      <Toolbar>
        <IconButton
          aria-label="menu-button"
          size="large"
          edge="start"
          color="inherit"
          sx={{ mr: 2 }}
          onClick={props.onToggleDrawer}
        >
          <Icon>menu</Icon>
        </IconButton>
        <Typography>{translator(props.filter)}</Typography>
      </Toolbar>
    </AppBar>
  </Box>
));

ToolBar.displayName = 'ToolBar';
