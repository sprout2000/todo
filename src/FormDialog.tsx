import React from 'react';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

interface Props {
  newTitle: string;
  open: boolean;
  handleClose: Function;
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
      open={props.open}
      onClose={(): void => props.handleClose()}>
      <form
        onSubmit={(e): void => {
          e.preventDefault();
          props.handleOnSubmit();
        }}>
        <TextField
          className={classes.input}
          label="What to do?"
          onChange={(e): void => props.handleOnChange(e)}
          value={props.newTitle}
          autoFocus
        />
        <DialogActions>
          <Button color="primary" onClick={(): void => props.handleOnSubmit()}>
            Add
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default FormDialog;
