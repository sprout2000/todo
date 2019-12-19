import React from 'react';
import i18next from 'i18next';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

interface Props {
  open: boolean;
  handleCloseAlert: Function;
  handleOnDelete: Function;
}

const AlertDialog = (props: Props): JSX.Element => {
  return (
    <div>
      <Dialog open={props.open} onClose={(): void => props.handleCloseAlert()}>
        <DialogTitle>{i18next.t('alert')}</DialogTitle>
        <DialogContent>
          <DialogContentText>{i18next.t('sure')}</DialogContentText>
          <DialogContentText>{i18next.t('cannot')}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={(): void => props.handleCloseAlert()}
            color="primary">
            {i18next.t('cancel')}
          </Button>
          <Button
            onClick={(): void => {
              props.handleCloseAlert();
              props.handleOnDelete();
            }}
            color="secondary"
            autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AlertDialog;
