import React from 'react';
import i18next from 'i18next';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

interface Props {
  newTitle: string;
  dialogOpen: boolean;
  closeDialog: Function;
  handleOnChange: Function;
  handleOnSubmit: Function;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    input: {
      width: '90%',
      margin: theme.spacing(2),
      fontSize: '16px',
    },
  })
);

const FormDialog = (props: Props): JSX.Element => {
  const classes = useStyles();

  return (
    <Dialog
      fullWidth
      open={props.dialogOpen}
      onClose={(): void => props.closeDialog()}>
      <form
        onSubmit={(e): void => {
          e.preventDefault();
          props.handleOnSubmit();
        }}>
        <TextField
          className={classes.input}
          label={i18next.t('whattodo')}
          onChange={(e): void => props.handleOnChange(e)}
          value={props.newTitle}
          autoFocus
        />
        <DialogActions>
          <Button color="primary" onClick={(): void => props.handleOnSubmit()}>
            {i18next.t('add')}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default FormDialog;
