import React, { useReducer, useEffect, createContext, Dispatch } from 'react';
import localforage from 'localforage';

import styled from '@material-ui/core/styles/styled';
import CssBaseline from '@material-ui/core/CssBaseline';

import { QR } from './QR';
import { ToolBar } from './ToolBar';
import { SideBar } from './SideBar';
import { TodoItem } from './TodoItem';
import { AddButton } from './AddButton';
import { FormDialog } from './FormDialog';
import { AlertDialog } from './AlertDialog';
import { DeleteButton } from './DeleteButton';

import { Todo } from '../lib/Todo';
import { State } from '../lib/State';
import { Action } from '../lib/Action';

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

export const AppContext = createContext(
  {} as {
    state: State;
    dispatch: Dispatch<Action>;
  }
);

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

  const RenderTodos: JSX.Element[] = state.todos
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
      return <TodoItem key={todo.id} todo={todo} />;
    });

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      <CssBaseline />
      <QR />
      <ToolBar />
      <SideBar />
      <FormDialog />
      <AlertDialog />
      <Container>
        {RenderTodos}
        {state.filter === 'removed' ? <DeleteButton /> : <AddButton />}
      </Container>
    </AppContext.Provider>
  );
};
