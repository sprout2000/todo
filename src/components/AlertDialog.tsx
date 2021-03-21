import React, { Dispatch } from 'react';
import i18next from 'i18next';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import makeStyles from '@material-ui/core/styles/makeStyles';
import createStyles from '@material-ui/core/styles/createStyles';

import { Action } from '../lib/Action';

interface Props {
  alertOpen: boolean;
  dispatch: Dispatch<Action>;
}

const useStyles = makeStyles(() =>
  createStyles({
    dialog: {
      fontFamily: '-apple-system, BlinkMacSystemFont, Roboto, sans-serif',
    },
  })
);

export const AlertDialog: React.FC<Props> = ({ alertOpen, dispatch }) => {
  const classes = useStyles();

  return (
    <Dialog
      className={classes.dialog}
      open={alertOpen}
      onClose={() => dispatch({ type: 'alert', value: false })}
    >
      <DialogTitle>{i18next.t('alert')}</DialogTitle>
      <DialogContent>
        <DialogContentText>{i18next.t('sure')}</DialogContentText>
        <DialogContentText>{i18next.t('cannot')}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => dispatch({ type: 'alert', value: !alertOpen })}
          color="primary"
        >
          {i18next.t('cancel')}
        </Button>
        <Button
          onClick={() => {
            dispatch({ type: 'alert', value: false });
            dispatch({ type: 'delete' });
          }}
          color="secondary"
          autoFocus
        >
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
};
