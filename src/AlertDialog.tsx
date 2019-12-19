import React from 'react';
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
        <DialogTitle>Alert</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to permanently erase the items in the Trash?
          </DialogContentText>
          <DialogContentText>
            You can&apos;t undo this action.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={(): void => props.handleCloseAlert()}
            color="primary">
            Cancel
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
