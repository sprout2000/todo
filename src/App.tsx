import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import localforage from 'localforage';
import i18next from 'i18next';

import Fab from '@material-ui/core/Fab';
import CreateRoundedIcon from '@material-ui/icons/CreateRounded';
import DeleteIcon from '@material-ui/icons/DeleteRounded';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import Titlebar from './Titlebar';
import FormDialog from './FormDialog';
import AlertDialog from './AlertDialog';
import TodoItem from './TodoItem';

import en from './locales/en.json';
import ja from './locales/ja.json';

interface Todo {
  id: number;
  title: string;
  checked: boolean;
  removed: boolean;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    '@global': {
      html: {
        margin: 0,
        padding: 0,
      },
      body: {
        margin: 0,
        padding: 0,
        backgroundColor: '#efeff4',
      },
      '#root': {
        margin: 0,
        padding: 0,
      },
    },
    toolbar: theme.mixins.toolbar,
    container: {
      margin: '0 auto',
      maxWidth: '640px',
    },
    fab: {
      position: 'fixed',
      right: 15,
      bottom: 15,
    },
  })
);

const Todo = (): JSX.Element => {
  const initTodos: Todo[] = [];

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);

  const [newTitle, setNewTitle] = useState('');
  const [todos, setTodos] = useState(initTodos);
  const [filter, setFilter] = useState('all');

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

  useEffect(() => {
    localforage.setItem('todo-20200101', todos).catch((err): void => {
      console.error(err);
    });
  }, [todos]);

  const openDrawer = (open: boolean): void => {
    setDrawerOpen(open);
  };

  const openDialog = (): void => {
    setDialogOpen(true);
  };

  const closeDialog = (): void => {
    setDialogOpen(false);
    setNewTitle('');
  };

  const openAlert = (): void => {
    setAlertOpen(true);
  };

  const closeAlert = (): void => {
    setAlertOpen(false);
  };

  const handleOnChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    setNewTitle(e.target.value);
  };

  const handleOnSubmit = (): void => {
    if (!newTitle) {
      closeDialog();
      return;
    }

    const newId = new Date().getTime();
    setTodos([
      { id: newId, title: newTitle, checked: false, removed: false },
      ...todos,
    ]);
    closeDialog();
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

  const handleOnRemove = (id: number, val: boolean): void => {
    const newTodos = todos.filter((todo: Todo) => {
      if (todo.id === id) {
        todo.removed = val;
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

  const removedTodos = todos.filter((todo): boolean => todo.removed);
  const classes = useStyles();

  return (
    <div>
      <Titlebar
        title={setTitle()}
        openDrawer={openDrawer}
        drawerOpen={drawerOpen}
        handleOnSort={handleOnSort}
      />
      <div className={classes.toolbar} />
      <div className={classes.container}>
        <div>{todoItems}</div>
        {filter === 'removed' ? (
          <Fab
            aria-label="delete-button"
            className={classes.fab}
            color="secondary"
            onClick={openAlert}
            disabled={removedTodos.length === 0}>
            <DeleteIcon />
          </Fab>
        ) : (
          <Fab
            aria-label="add-button"
            className={classes.fab}
            color="secondary"
            onClick={openDialog}
            disabled={filter !== 'all'}>
            <CreateRoundedIcon />
          </Fab>
        )}
        <FormDialog
          dialogOpen={dialogOpen}
          newTitle={newTitle}
          closeDialog={closeDialog}
          handleOnChange={handleOnChange}
          handleOnSubmit={handleOnSubmit}
        />
        <AlertDialog
          alertOpen={alertOpen}
          closeAlert={closeAlert}
          handleOnDelete={handleOnDelete}
        />
      </div>
    </div>
  );
};

ReactDOM.render(<Todo />, document.getElementById('root'));

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
