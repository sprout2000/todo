import { memo } from 'react';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';

import i18next from 'i18next';

type Props = {
  text: string;
  dialogOpen: boolean;
  onSubmit: () => void;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onToggleDialog: () => void;
};

export const FormDialog = memo((props: Props) => (
  <Dialog fullWidth open={props.dialogOpen} onClose={props.onToggleDialog}>
    <form
      onSubmit={(e) => {
        e.preventDefault();
        props.onSubmit();
      }}
    >
      <div style={{ margin: '1em' }}>
        <TextField
          aria-label="todo-input"
          variant="standard"
          style={{
            width: '100%',
            fontSize: '16px',
            fontFamily: '-apple-system, BlinkMacSystemFont, Roboto, sans-serif',
          }}
          label={i18next.t('input')}
          onChange={(e) => props.onChange(e)}
          value={props.text}
          autoFocus
        />
        <DialogActions>
          <Button
            aria-label="form-add"
            color="secondary"
            onClick={props.onSubmit}
          >
            {i18next.t('add')}
          </Button>
        </DialogActions>
      </div>
    </form>
  </Dialog>
));

FormDialog.displayName = 'FormDialog';
