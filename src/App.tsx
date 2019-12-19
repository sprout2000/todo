import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import localforage from 'localforage';

import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import Titlebar from './Titlebar';
import FormDialog from './FormDialog';
import AlertDialog from './AlertDialog';
import TodoItem from './TodoItem';
import DeleteIcon from '@material-ui/icons/Delete';

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
  const [open, setOpen] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [todos, setTodos] = useState(initTodos);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
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

  const toggleDrawer = (open: boolean): void => {
    setDrawerOpen(open);
  };

  const handleClickOpen = (): void => {
    setOpen(true);
  };

  const handleClose = (): void => {
    setOpen(false);
    setNewTitle('');
  };

  const handleAlertOpen = (): void => {
    setAlertOpen(true);
  };

  const handleAlertClose = (): void => {
    setAlertOpen(false);
  };

  const handleOnAdd = (todo: string): void => {
    const newId = new Date().getTime();
    setTodos([
      { id: newId, title: todo, checked: false, removed: false },
      ...todos,
    ]);
  };

  const handleOnEdit = (id: number, title: string): void => {
    const newTodo = todos.map((todo: Todo) => {
      if (todo.id === id) {
        todo.title = title;
      }
      return todo;
    });

    setTodos(newTodo);
  };

  const handleOnCheck = (id: number, checked: boolean): void => {
    const newTodo = todos.map((todo) => {
      if (todo.id === id) {
        todo.checked = checked;
      }
      return todo;
    });

    setTodos(newTodo);
  };

  const handleOnRemove = (id: number, val: boolean): void => {
    const newTodo = todos.filter((todo: Todo) => {
      if (todo.id === id) {
        todo.removed = val;
      }
      return todo;
    });

    setTodos(newTodo);
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

  const handleOnChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    setNewTitle(e.target.value);
  };

  const handleOnSubmit = (): void => {
    if (!newTitle) {
      handleClose();
      return;
    }

    handleOnAdd(newTitle);
    handleClose();
  };

  const filterTodos = todos.filter((todo) => {
    if (filter === 'all') {
      return !todo.removed;
    } else if (filter === 'complete') {
      return todo.checked && !todo.removed;
    } else if (filter === 'incomplete') {
      return !todo.checked && !todo.removed;
    } else if (filter === 'removed') {
      return todo.removed;
    } else {
      return null;
    }
  });

  const setTitle = (): string => {
    if (filter === 'all') {
      return 'All Tasks';
    } else if (filter === 'complete') {
      return 'Completed Tasks';
    } else if (filter === 'incomplete') {
      return 'Incomplete Tasks';
    } else {
      return 'Trash';
    }
  };

  const todoItems = filterTodos.map((todo) => {
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
  });

  const isRemoved = todos.filter((todo): boolean => todo.removed);
  const classes = useStyles();

  return (
    <div>
      <Titlebar
        title={setTitle()}
        toggleDrawer={toggleDrawer}
        drawerOpen={drawerOpen}
        handleOnSort={handleOnSort}
      />
      <div className={classes.toolbar} />
      <div className={classes.container}>
        <div>{todoItems}</div>
        {filter === 'removed' ? (
          <Fab
            className={classes.fab}
            color="secondary"
            onClick={handleAlertOpen}
            disabled={isRemoved.length === 0}>
            <DeleteIcon />
          </Fab>
        ) : (
          <Fab
            className={classes.fab}
            color="secondary"
            onClick={handleClickOpen}
            disabled={filter !== 'all'}>
            <AddIcon />
          </Fab>
        )}
        <FormDialog
          open={open}
          newTitle={newTitle}
          handleClose={handleClose}
          handleOnChange={handleOnChange}
          handleOnSubmit={handleOnSubmit}
        />
        <AlertDialog
          open={alertOpen}
          handleCloseAlert={handleAlertClose}
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
