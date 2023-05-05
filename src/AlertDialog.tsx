import { memo } from 'react';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

import { styled } from '@mui/material/styles';

import i18next from 'i18next';

type Props = {
  alertOpen: boolean;
  onEmpty: () => void;
  onToggleAlert: () => void;
};

const Alert = styled(Dialog)(() => ({
  fontFamily: '-apple-system, BlinkMacSystemFont, Roboto, sans-serif',
}));

export const AlertDialog = memo((props: Props) => (
  <Alert open={props.alertOpen} onClose={props.onToggleAlert}>
    <DialogTitle>{i18next.t('alert')}</DialogTitle>
    <DialogContent>
      <DialogContentText>{i18next.t('sure')}</DialogContentText>
      <DialogContentText>{i18next.t('undone')}</DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button
        aria-label="alert-cancel"
        onClick={props.onToggleAlert}
        color="primary"
      >
        {i18next.t('cancel')}
      </Button>
      <Button
        aria-label="alert-ok"
        onClick={() => {
          props.onToggleAlert();
          props.onEmpty();
        }}
        color="secondary"
        autoFocus
      >
        {i18next.t('ok')}
      </Button>
    </DialogActions>
  </Alert>
));

AlertDialog.displayName = 'AlertDialog';
