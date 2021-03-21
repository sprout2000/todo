import React, { useContext, memo } from 'react';
import i18next from 'i18next';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import { AppContext } from './App';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    input: {
      width: '90%',
      margin: theme.spacing(2),
      fontSize: '16px',
      fontFamily: '-apple-system, BlinkMacSystemFont, Roboto, sans-serif',
    },
  })
);

export const FormDialog: React.FC = memo(() => {
  const classes = useStyles();
  const { state, dispatch } = useContext(AppContext);

  return (
    <Dialog
      fullWidth
      open={state.dialogOpen}
      onClose={() => dispatch({ type: 'dialog', value: !state.dialogOpen })}
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          dispatch({ type: 'submit' });
        }}
      >
        <TextField
          className={classes.input}
          label={i18next.t('whattodo')}
          onChange={(e) => dispatch({ type: 'text', value: e.target.value })}
          value={state.text}
          autoFocus
        />
        <DialogActions>
          <Button color="primary" onClick={() => dispatch({ type: 'submit' })}>
            {i18next.t('add')}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
});

FormDialog.displayName = 'FormDialog';
