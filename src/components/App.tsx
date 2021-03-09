import React, { useState, useEffect, useCallback } from 'react';
import localforage from 'localforage';

/** Fab and Icons */
import Fab from '@material-ui/core/Fab';
import CreateIcon from '@material-ui/icons/CreateRounded';
import DeleteIcon from '@material-ui/icons/DeleteRounded';

/** Styles */
import styled from '@material-ui/core/styles/styled';
import CssBaseline from '@material-ui/core/CssBaseline';

/** Components */
import { ToolBar } from './ToolBar';
import { SideBar } from './SideBar';
import { FormDialog } from './FormDialog';
import { AlertDialog } from './AlertDialog';
import { TodoItem } from './TodoItem';

/** Types for Todo & Filter */
import { Todo } from '../Todo';
import { Filter } from '../Filter';

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
  const [todos, setTodos] = useState<Todo[]>([]);
  const [text, setText] = useState('');
  const [filter, setFilter] = useState<Filter>('all');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);

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
          setTodos(newTodos);
        }
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    localforage.setItem('todo-20200101', todos).catch((err) => {
      console.error(err);
    });
  }, [todos]);

  const toggleDrawer = () => setDrawerOpen(!drawerOpen);

  const toggleDialog = () => {
    setDialogOpen(!dialogOpen);
    setText('');
  };

  const toggleAlert = () => setAlertOpen(!alertOpen);

  const handleOnChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setText(e.target.value);

  const handleOnSubmit = () => {
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

  const handleOnEdit = (id: number, title: string) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.title = title;
      }
      return todo;
    });

    setTodos(newTodos);
  };

  const handleOnCheck = (id: number, checked: boolean) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.checked = checked;
      }
      return todo;
    });

    setTodos(newTodos);
  };

  const handleOnRemove = (id: number, removed: boolean) => {
    const newTodos = todos.filter((todo) => {
      if (todo.id === id) {
        todo.removed = removed;
      }
      return todo;
    });

    setTodos(newTodos);
  };

  const handleOnDelete = () => {
    const newTodos = todos.filter((todo) => !todo.removed);

    setTodos(newTodos);
  };

  const handleOnSort = (filter: Filter) => {
    setFilter(filter);
  };

  const setTitle = useCallback(() => {
    if (filter === 'all') {
      return 'すべてのタスク';
    } else if (filter === 'complete') {
      return '完了したタスク';
    } else if (filter === 'incomplete') {
      return 'マイタスク';
    } else {
      return 'ごみ箱';
    }
  }, [filter]);

  const filteredTodos = todos.filter((todo) => {
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

  const todoItems = filteredTodos.map((todo) => {
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

  const removed = todos.filter((todo) => todo.removed).length !== 0;

  useEffect(() => {
    setTitle();
  }, [setTitle]);

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
        handleOnDelete={handleOnDelete}
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
            disabled={filter === 'complete' || dialogOpen}>
            <CreateIcon />
          </FabButton>
        )}
      </Container>
    </React.Fragment>
  );
};
