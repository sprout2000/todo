import React, { useState, useEffect } from 'react';
import localforage from 'localforage';
import i18next from 'i18next';

/** Fab and Icons */
import Fab from '@material-ui/core/Fab';
import CreateIcon from '@material-ui/icons/CreateRounded';
import DeleteIcon from '@material-ui/icons/DeleteRounded';

/** Styles */
import 'typeface-roboto';
import styled from '@material-ui/core/styles/styled';
import CssBaseline from '@material-ui/core/CssBaseline';

/** Components */
import ToolBar from './ToolBar';
import SideBar from './SideBar';
import FormDialog from './FormDialog';
import AlertDialog from './AlertDialog';
import TodoItem from './TodoItem';

/** Resources */
import en from '../locales/en.json';
import ja from '../locales/ja.json';

/** Types for Todo */
import { Todo } from '../Todo';

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

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [text, setText] = useState('');
  const [filter, setFilter] = useState('all');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);

  useEffect(() => {
    const locale =
      (window.navigator.languages && window.navigator.languages[0]) ||
      window.navigator.language;

    i18next.init({
      lng: locale,
      fallbackLng: 'en',
      resources: {
        en: {
          translation: en,
        },
        ja: {
          translation: ja,
        },
      },
    });

    localforage
      .getItem('todo-20200101')
      .then((values) => {
        if (!values || !Array.isArray(values)) {
          setTodos([]);
        } else {
          const newTodos: Todo[] = [];
          for (const val of values) {
            if (typeguardTodo(val)) newTodos.push(val);
          }
          setTodos(newTodos);
        }
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    localforage.setItem('todo-20200101', todos).catch((err): void => {
      console.error(err);
    });
  }, [todos]);

  const toggleDrawer = (): void => setDrawerOpen(!drawerOpen);

  const toggleDialog = (): void => {
    setDialogOpen(!dialogOpen);
    setText('');
  };

  const toggleAlert = (): void => setAlertOpen(!alertOpen);

  const handleOnChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    setText(e.target.value);
  };

  const handleOnSubmit = (): void => {
    if (!text) {
      toggleDialog();
      return;
    }

    const newId = new Date().getTime();
    const oldTodos = todos.slice();
    setTodos([
      {
        id: newId,
        title: text,
        checked: false,
        removed: false,
      },
      ...oldTodos,
    ]);
    toggleDialog();
  };

  const handleOnEdit = (id: number, title: string): void => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.title = title;
      }
      return todo;
    });

    setTodos(newTodos);
  };

  const handleOnCheck = (id: number, checked: boolean): void => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.checked = checked;
      }
      return todo;
    });

    setTodos(newTodos);
  };

  const handleOnRemove = (id: number, removed: boolean): void => {
    const newTodos = todos.filter((todo) => {
      if (todo.id === id) {
        todo.removed = removed;
      }
      return todo;
    });

    setTodos(newTodos);
  };

  const handleOnDelete = (): void => {
    const newTodos = todos.filter((todo) => !todo.removed);

    setTodos(newTodos);
  };

  const handleOnSort = (filter: string): void => {
    setFilter(filter);
  };

  const setTitle = (): string => {
    if (filter === 'all') {
      return i18next.t('all');
    } else if (filter === 'complete') {
      return i18next.t('complete');
    } else if (filter === 'incomplete') {
      return i18next.t('incomplete');
    } else {
      return i18next.t('trash');
    }
  };

  const filteredTodos = todos.filter((todo): boolean => {
    if (filter === 'complete') {
      return todo.checked && !todo.removed;
    } else if (filter === 'incomplete') {
      return !todo.checked && !todo.removed;
    } else if (filter === 'removed') {
      return todo.removed;
    } else {
      return !todo.removed;
    }
  });

  const todoItems = filteredTodos.map(
    (todo): JSX.Element => {
      return (
        <TodoItem
          key={todo.id}
          todo={todo}
          filter={filter}
          onEdit={handleOnEdit}
          onCheck={handleOnCheck}
          onRemove={handleOnRemove}
        />
      );
    }
  );

  const removed = todos.filter((todo): boolean => todo.removed).length !== 0;

  return (
    <React.Fragment>
      <CssBaseline />
      <ToolBar title={setTitle()} toggleDrawer={toggleDrawer} />
      <SideBar
        toggleDrawer={toggleDrawer}
        drawerOpen={drawerOpen}
        handleOnSort={handleOnSort}
      />
      <FormDialog
        dialogOpen={dialogOpen}
        text={text}
        toggleDialog={toggleDialog}
        handleOnChange={(
          e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
        ): void => handleOnChange(e)}
        handleOnSubmit={handleOnSubmit}
      />
      <AlertDialog
        alertOpen={alertOpen}
        toggleAlert={toggleAlert}
        handleOnDelete={(): void => handleOnDelete()}
      />
      <Container>
        {todoItems}
        {filter === 'removed' ? (
          <FabButton
            aria-label="delete-button"
            color="secondary"
            onClick={toggleAlert}
            disabled={!removed || alertOpen}>
            <DeleteIcon />
          </FabButton>
        ) : (
          <FabButton
            aria-label="add-button"
            color="secondary"
            onClick={toggleDialog}
            disabled={filter !== 'all' || dialogOpen}>
            <CreateIcon />
          </FabButton>
        )}
      </Container>
    </React.Fragment>
  );
};

export default App;
