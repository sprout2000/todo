import React from 'react';
import i18next from 'i18next';

/** MUI Components */
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

/** Styles */
import makeStyles from '@material-ui/core/styles/makeStyles';
import createStyles from '@material-ui/core/styles/createStyles';

interface Props {
  alertOpen: boolean;
  toggleAlert: () => void;
  handleOnDelete: () => void;
}

const useStyles = makeStyles(() =>
  createStyles({
    dialog: {
      fontFamily: '-apple-system, BlinkMacSystemFont, Roboto, sans-serif',
    },
  })
);

const AlertDialog: React.FC<Props> = (props) => {
  const classes = useStyles();

  return (
    <Dialog
      className={classes.dialog}
      open={props.alertOpen}
      onClose={props.toggleAlert}>
      <DialogTitle>{i18next.t('alert')}</DialogTitle>
      <DialogContent>
        <DialogContentText>{i18next.t('sure')}</DialogContentText>
        <DialogContentText>{i18next.t('cannot')}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.toggleAlert} color="primary">
          {i18next.t('cancel')}
        </Button>
        <Button
          onClick={() => {
            props.toggleAlert();
            props.handleOnDelete();
          }}
          color="secondary"
          autoFocus>
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AlertDialog;
