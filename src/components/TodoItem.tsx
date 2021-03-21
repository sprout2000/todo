import React, { useContext, memo } from 'react';

import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import { lightBlue, pink, grey } from '@material-ui/core/colors';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import UndoIcon from '@material-ui/icons/Undo';
import DeleteIcon from '@material-ui/icons/Delete';
import CheckIcon from '@material-ui/icons/CheckCircleOutline';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';

import { Todo } from '../lib/Todo';
import { AppContext } from './App';

interface Props {
  todo: Todo;
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

export const TodoItem: React.FC<Props> = memo(({ todo }) => {
  const classes = useStyles();
  const { state, dispatch } = useContext(AppContext);

  return (
    <Card className={classes.card}>
      <div className={classes.form}>
        <TextField
          fullWidth
          value={todo.title}
          onChange={(e) =>
            dispatch({
              type: 'edit',
              id: todo.id,
              value: state.todos,
              val: e.target.value,
            })
          }
          disabled={todo.checked || todo.removed}
        />
      </div>
      <div className={classes.buttonContainer}>
        <div>
          <button
            className={classes.button}
            onClick={() =>
              dispatch({
                type: 'check',
                id: todo.id,
                value: state.todos,
                checked: !todo.checked,
              })
            }
            disabled={state.filter === 'removed'}
          >
            {todo.checked ? (
              <CheckIcon
                style={{
                  color: state.filter !== 'removed' ? pink.A200 : grey[500],
                }}
              />
            ) : (
              <RadioButtonUncheckedIcon
                style={{
                  color:
                    state.filter !== 'removed' ? lightBlue[500] : grey[500],
                }}
              />
            )}
            <Typography
              className={classes.done}
              style={{
                color:
                  todo.checked && state.filter !== 'removed'
                    ? pink.A200
                    : grey[500],
              }}
            >
              Done
            </Typography>
          </button>
        </div>
        <button
          onClick={() =>
            dispatch({
              type: 'remove',
              id: todo.id,
              value: state.todos,
              removed: !todo.removed,
            })
          }
          className={classes.trash}
        >
          {todo.removed ? (
            <UndoIcon style={{ color: lightBlue[500] }} />
          ) : (
            <DeleteIcon style={{ color: grey[500] }} />
          )}
        </button>
      </div>
    </Card>
  );
});

TodoItem.displayName = 'TodoItem';
