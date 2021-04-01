import React, { useReducer, useEffect, createContext, Dispatch } from 'react';
import localforage from 'localforage';

import styled from '@material-ui/core/styles/styled';
import CssBaseline from '@material-ui/core/CssBaseline';

import { QR } from './QR';
import { Buttons } from './Buttons';
import { ToolBar } from './ToolBar';
import { SideBar } from './SideBar';
import { TodoList } from './TodoList';
import { FormDialog } from './FormDialog';
import { AlertDialog } from './AlertDialog';

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
          return initialState;
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

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      <CssBaseline />
      <QR />
      <ToolBar />
      <SideBar />
      <FormDialog />
      <AlertDialog />
      <Container>
        <TodoList />
        <Buttons />
      </Container>
    </AppContext.Provider>
  );
};
