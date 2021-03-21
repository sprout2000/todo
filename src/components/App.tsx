import React, { useReducer, useEffect } from 'react';
import i18next from 'i18next';
import localforage from 'localforage';

import Fab from '@material-ui/core/Fab';
import CreateIcon from '@material-ui/icons/CreateRounded';
import DeleteIcon from '@material-ui/icons/DeleteRounded';

import styled from '@material-ui/core/styles/styled';
import CssBaseline from '@material-ui/core/CssBaseline';

import { ToolBar } from './ToolBar';
import { SideBar } from './SideBar';
import { FormDialog } from './FormDialog';
import { AlertDialog } from './AlertDialog';
import { TodoItem } from './TodoItem';
import { QR } from './QR';

import { Todo } from '../lib/Todo';
import { reducer } from '../lib/reducer';
import { initialState } from '../lib/initialState';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const typeguardTodo = (arg: any): arg is Todo => {
  return (
    arg !== null &&
    typeof arg === 'object' &&
    typeof arg.id === 'number' &&
    typeof arg.title === 'string' &&
    typeof arg.checked === 'boolean' &&
    typeof arg.removed === 'boolean'
  );
};

const Container = styled('div')({
  margin: '0 auto',
  maxWidth: '640px',
  fontFamily: '-apple-system, BlinkMacSystemFont, Roboto, sans-serif',
});

const FabButton = styled(Fab)({
  position: 'fixed',
  right: 15,
  bottom: 15,
});

export const App: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    localforage
      .getItem('todo-20200101')
      .then((values) => {
        if (!values || !Array.isArray(values)) {
          return;
        } else {
          const newTodos: Todo[] = [];
          for (const val of values) {
            if (typeguardTodo(val)) newTodos.push(val);
          }
          dispatch({ type: 'localforage', value: newTodos });
        }
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    localforage.setItem('todo-20200101', state.todos).catch((err) => {
      console.error(err);
    });
  }, [state.todos]);

  const setTitle = () => {
    switch (state.filter) {
      case 'all':
        return i18next.t('all');
      case 'complete':
        return i18next.t('complete');
      case 'incomplete':
        return i18next.t('incomplete');
      case 'removed':
        return i18next.t('trash');
      default:
        return i18next.t('all');
    }
  };

  const filteredTodos = state.todos
    .filter((todo) => {
      switch (state.filter) {
        case 'complete':
          return todo.checked && !todo.removed;
        case 'incomplete':
          return !todo.checked && !todo.removed;
        case 'removed':
          return todo.removed;
        case 'all':
          return !todo.removed;
        default:
          return todo;
      }
    })
    .map((todo) => {
      return (
        <TodoItem
          key={todo.id}
          todo={todo}
          todos={state.todos}
          filter={state.filter}
          dispatch={dispatch}
        />
      );
    });

  const removed = state.todos.filter((todo) => todo.removed).length !== 0;

  return (
    <React.Fragment>
      <CssBaseline />
      <QR open={state.qrOpen} dispatch={dispatch} />
      <ToolBar
        title={setTitle()}
        drawerOpen={state.drawerOpen}
        dispatch={dispatch}
      />
      <SideBar drawerOpen={state.drawerOpen} dispatch={dispatch} />
      <FormDialog
        text={state.text}
        dialogOpen={state.dialogOpen}
        dispatch={dispatch}
      />
      <AlertDialog alertOpen={state.alertOpen} dispatch={dispatch} />
      <Container>
        {filteredTodos}
        {state.filter === 'removed' ? (
          <FabButton
            aria-label="delete-button"
            color="secondary"
            onClick={() => dispatch({ type: 'alert', value: !state.alertOpen })}
            disabled={!removed || state.alertOpen}
          >
            <DeleteIcon />
          </FabButton>
        ) : (
          <FabButton
            aria-label="add-button"
            color="secondary"
            onClick={() =>
              dispatch({ type: 'dialog', value: !state.dialogOpen })
            }
            disabled={state.filter === 'complete' || state.dialogOpen}
          >
            <CreateIcon />
          </FabButton>
        )}
      </Container>
    </React.Fragment>
  );
};
