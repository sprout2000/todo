import { useCallback, useEffect, useReducer } from 'react';

import localforage from 'localforage';

import GlobalStyles from '@mui/material/GlobalStyles';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { indigo, pink } from '@mui/material/colors';

import { QR } from './QR';
import { ToolBar } from './ToolBar';
import { SideBar } from './SideBar';
import { TodoItem } from './TodoItem';
import { FormDialog } from './FormDialog';
import { AlertDialog } from './AlertDialog';
import { ActionButton } from './ActionButton';

import { isTodos } from './lib/isTodos';
import { reducer } from './lib/reducer';
import { initialState } from './lib/intialState';

const theme = createTheme({
  palette: {
    primary: {
      main: indigo[500],
      light: '#757de8',
      dark: '#002984',
    },
    secondary: {
      main: pink[500],
      light: '#ff6090',
      dark: '#b0003a',
    },
  },
});

export const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleToggleQR = useCallback(() => {
    dispatch({ type: 'toggleQR' });
  }, []);

  const handleToggleDrawer = useCallback(() => {
    dispatch({ type: 'toggleDrawer' });
  }, []);

  const handleToggleDialog = useCallback(() => {
    dispatch({ type: 'toggleDialog' });
  }, []);

  const handleToggleAlert = useCallback(() => {
    dispatch({ type: 'toggleAlert' });
  }, []);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      dispatch({ type: 'handleChange', text: e.target.value });
    },
    []
  );

  const handleSubmit = useCallback(() => {
    dispatch({ type: 'handleSubmit' });
  }, []);

  const handleTodo = useCallback(
    <K extends keyof Todo, V extends Todo[K]>(id: number, key: K, value: V) => {
      dispatch({ type: 'handleTodo', id, key, value });
    },
    []
  );

  const handleEmpty = useCallback(() => {
    dispatch({ type: 'handleEmpty' });
  }, []);

  const handleSort = useCallback((filter: Filter) => {
    dispatch({ type: 'handleSort', filter });
  }, []);

  useEffect(() => {
    localforage
      .getItem('todo-20200101')
      .then(
        (values) => isTodos(values) && dispatch({ type: 'localforage', values })
      );
  }, []);

  useEffect(() => {
    localforage.setItem('todo-20200101', state.todos);
  }, [state.todos]);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles styles={{ body: { margin: 0, padding: 0 } }} />
      <ToolBar filter={state.filter} onToggleDrawer={handleToggleDrawer} />
      <SideBar
        drawerOpen={state.drawerOpen}
        onSort={handleSort}
        onToggleQR={handleToggleQR}
        onToggleDrawer={handleToggleDrawer}
      />
      <QR open={state.qrOpen} onClose={handleToggleQR} />
      <FormDialog
        text={state.text}
        dialogOpen={state.dialogOpen}
        onChange={handleChange}
        onSubmit={handleSubmit}
        onToggleDialog={handleToggleDialog}
      />
      <AlertDialog
        alertOpen={state.alertOpen}
        onEmpty={handleEmpty}
        onToggleAlert={handleToggleAlert}
      />
      <TodoItem todos={state.todos} filter={state.filter} onTodo={handleTodo} />
      <ActionButton
        todos={state.todos}
        filter={state.filter}
        alertOpen={state.alertOpen}
        dialogOpen={state.dialogOpen}
        onToggleAlert={handleToggleAlert}
        onToggleDialog={handleToggleDialog}
      />
    </ThemeProvider>
  );
};
