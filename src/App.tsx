import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
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
import TitleBar from './TitleBar';
import SideBar from './SideBar';
import FormDialog from './FormDialog';
import AlertDialog from './AlertDialog';
import TodoItem from './TodoItem';

/** Resources */
import en from './locales/en.json';
import ja from './locales/ja.json';

interface Todo {
  id: number;
  title: string;
  checked: boolean;
  removed: boolean;
}

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

const App = (): JSX.Element => {
  const initTodos: Todo[] = [];

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);

  const [newTitle, setNewTitle] = useState('');
  const [todos, setTodos] = useState(initTodos);
  const [filter, setFilter] = useState('all');

  /** Load at once */
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
      .then((value) => {
        if (!value) {
          setTodos([]);
        } else {
          setTodos(value as Todo[]);
        }
      })
      .catch((err) => console.error(err));
  }, []);

  /** Save on change */
  useEffect(() => {
    localforage.setItem('todo-20200101', todos).catch((err): void => {
      console.error(err);
    });
  }, [todos]);

  /** Toggle controls */
  const toggleDrawer = (): void => setDrawerOpen(!drawerOpen);

  const toggleDialog = (): void => {
    setDialogOpen(!dialogOpen);
    setNewTitle('');
  };

  const toggleAlert = (): void => {
    setAlertOpen(!alertOpen);
  };

  const handleOnChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    setNewTitle(e.target.value);
  };

  const handleOnSubmit = (): void => {
    if (!newTitle) {
      toggleDialog();
      return;
    }

    const newId = new Date().getTime();
    setTodos([
      { id: newId, title: newTitle, checked: false, removed: false },
      ...todos,
    ]);
    toggleDialog();
  };

  const handleOnEdit = (id: number, title: string): void => {
    const newTodos = todos.map((todo: Todo) => {
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
    const newTodos = todos.filter((todo: Todo) => {
      if (todo.id === id) {
        todo.removed = removed;
      }
      return todo;
    });

    setTodos(newTodos);
  };

  const handleOnDelete = (): void => {
    const newTodos: Todo[] = todos.filter(
      (todo: Todo): boolean => todo.removed !== true
    );

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
      <TitleBar title={setTitle()} toggleDrawer={toggleDrawer} />
      <SideBar
        toggleDrawer={toggleDrawer}
        drawerOpen={drawerOpen}
        handleOnSort={handleOnSort}
      />
      <FormDialog
        dialogOpen={dialogOpen}
        newTitle={newTitle}
        toggleDialog={toggleDialog}
        handleOnChange={handleOnChange}
        handleOnSubmit={handleOnSubmit}
      />
      <AlertDialog
        alertOpen={alertOpen}
        toggleAlert={toggleAlert}
        handleOnDelete={handleOnDelete}
      />
      <Container>
        {todoItems}
        {filter === 'removed' ? (
          <FabButton
            aria-label='delete-button'
            color='secondary'
            onClick={toggleAlert}
            disabled={!removed || alertOpen}>
            <DeleteIcon />
          </FabButton>
        ) : (
          <FabButton
            aria-label='add-button'
            color='secondary'
            onClick={toggleDialog}
            disabled={filter !== 'all' || dialogOpen}>
            <CreateIcon />
          </FabButton>
        )}
      </Container>
    </React.Fragment>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));

if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('./service-worker.js')
      .then((registration) => {
        console.log('SW registered: ', registration);
      })
      .catch((registrationError) => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}
