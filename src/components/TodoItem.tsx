import React from 'react';

/** MUI Components */
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

/** Styles */
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

/** Colors */
import { lightBlue, pink, grey } from '@material-ui/core/colors';

/** Icons */
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import CheckIcon from '@material-ui/icons/CheckCircleOutline';
import UndoIcon from '@material-ui/icons/Undo';
import DeleteIcon from '@material-ui/icons/Delete';

/** Types for Todo & Filter */
import { Todo } from '../Todo';
import { Filter } from '../Filter';

interface Props {
  todo: Todo;
  onEdit: (id: number, title: string) => void;
  onCheck: (id: number, checked: boolean) => void;
  onRemove: (id: number, removed: boolean) => void;
  filter: Filter;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    titlebar: {
      flexGrow: 1,
    },
    card: {
      marginTop: theme.spacing(1),
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(2),
      padding: theme.spacing(1),
      fontFamily: '-apple-system, BlinkMacSystemFont, Roboto, sans-serif',
    },
    buttonContainer: {
      marginTop: theme.spacing(1),
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    button: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      outline: 'none',
    },
    done: {
      userSelect: 'none',
    },
    form: {
      marginTop: theme.spacing(1),
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      fontSize: '16px',
    },
    trashContainer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    trash: {
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      outline: 'none',
    },
  })
);

export const TodoItem: React.FC<Props> = (props) => {
  const classes = useStyles();

  const handleOnEdit = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const val: string = e.target.value;
    props.onEdit(props.todo.id, val);
  };

  const handleOnCheck = () => {
    const val = !props.todo.checked;
    props.onCheck(props.todo.id, val);
  };

  const handleOnRemove = () => {
    const val = !props.todo.removed;
    props.onRemove(props.todo.id, val);
  };

  return (
    <Card className={classes.card}>
      <div className={classes.form}>
        <TextField
          fullWidth
          value={props.todo.title}
          onChange={(e) => handleOnEdit(e)}
          disabled={props.todo.checked || props.todo.removed}
        />
      </div>
      <div className={classes.buttonContainer}>
        <div>
          <button
            className={classes.button}
            onClick={handleOnCheck}
            disabled={props.filter === 'removed'}>
            {props.todo.checked ? (
              <CheckIcon
                style={{
                  color: props.filter !== 'removed' ? pink.A200 : grey[500],
                }}
              />
            ) : (
              <RadioButtonUncheckedIcon
                style={{
                  color:
                    props.filter !== 'removed' ? lightBlue[500] : grey[500],
                }}
              />
            )}
            <Typography
              className={classes.done}
              style={{
                color:
                  props.todo.checked && props.filter !== 'removed'
                    ? pink.A200
                    : grey[500],
              }}>
              Done
            </Typography>
          </button>
        </div>
        <button onClick={handleOnRemove} className={classes.trash}>
          {props.todo.removed ? (
            <UndoIcon style={{ color: lightBlue[500] }} />
          ) : (
            <DeleteIcon style={{ color: grey[500] }} />
          )}
        </button>
      </div>
    </Card>
  );
};
