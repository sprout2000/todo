import React from 'react';

/** MUI Components */
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';

/** Styles */
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

interface Props {
  text: string;
  dialogOpen: boolean;
  toggleDialog: () => void;
  handleOnChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleOnSubmit: () => void;
}

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

const FormDialog: React.FC<Props> = (props) => {
  const classes = useStyles();

  return (
    <Dialog fullWidth open={props.dialogOpen} onClose={props.toggleDialog}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          props.handleOnSubmit();
        }}>
        <TextField
          className={classes.input}
          label="タスクを入力..."
          onChange={(e) => props.handleOnChange(e)}
          value={props.text}
          autoFocus
        />
        <DialogActions>
          <Button color="primary" onClick={props.handleOnSubmit}>
            追加
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default FormDialog;
