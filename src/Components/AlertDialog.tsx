import React from 'react';

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
      <DialogTitle>アラート</DialogTitle>
      <DialogContent>
        <DialogContentText>本当にごみ箱を完全に空にしますか?</DialogContentText>
        <DialogContentText>この操作は取り消しできません。</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.toggleAlert} color="primary">
          キャンセル
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
