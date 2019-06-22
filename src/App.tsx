import React from 'react';
import localforage from 'localforage';

import ons from 'onsenui';

import {
  Toolbar,
  ToolbarButton,
  Page,
  Fab,
  Splitter,
  SplitterSide,
  SplitterContent,
} from 'react-onsenui';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faPen, faTrash } from '@fortawesome/free-solid-svg-icons';

import 'onsenui/css/onsenui-core.min.css';
import './onsen-css-components.min.css';
import './App.css';

import Drawer from './Drawer';
import TodoItem from './TodoItem';

interface Todo {
  id: number;
  title: string;
  checked: boolean;
  removed: boolean;
}

interface State {
  todos: Todo[];
  filter: string;
  drawerOpen: boolean;
}

class App extends React.Component {
  public state: State = {
    todos: [],
    filter: 'undone',
    drawerOpen: false,
  };

  public componentDidMount(): void {
    localforage
      .getItem('todo-20180110')
      .then((value: unknown): void | PromiseLike<void> => {
        if (!value) {
          this.setState({ todos: [] });
        } else {
          this.setState({ todos: value });
        }
      })
      .catch((err): void => {
        console.error(err);
      });
  }

  public componentDidUpdate(prevProps: State, prevState: State): void {
    if (this.state.todos !== prevState.todos) {
      localforage
        .setItem('todo-20180110', this.state.todos)
        .catch((err): void => {
          console.error(err);
        });
    }
  }

  public onSubmit = (todo: string): void => {
    if (!todo) {
      return;
    }
    const newId: number = new Date().getTime();
    this.setState({
      todos: [
        { id: newId, title: todo, checked: false, removed: false },
        ...this.state.todos,
      ],
    });
  };

  public onEdit = (id: number, val: string): void => {
    const newTodos: Todo[] = this.state.todos.map(
      (todo: Todo): Todo => {
        if (todo.id === id) {
          todo.title = val;
        }
        return todo;
      }
    );
    this.setState({ todos: newTodos });
  };

  public onCheck = (id: number, val: boolean): void => {
    let newTodos: Todo[] = this.state.todos.map(
      (todo: Todo): Todo => {
        if (todo.id === id) {
          todo.checked = val;
        }
        return todo;
      }
    );

    this.setState({ todos: newTodos });
  };

  public onRemove = (id: number, val: boolean): void => {
    let newTodos: Todo[] = this.state.todos.map(
      (todo: Todo): Todo => {
        if (todo.id === id) {
          todo.removed = val;
        }
        return todo;
      }
    );

    this.setState({ todos: newTodos });
  };

  public onDelete = (): void => {
    const newTodos: Todo[] = this.state.todos.filter(
      (todo: Todo): boolean => todo.removed !== true
    );
    this.setState({
      todos: newTodos,
    });
  };

  public onFilter(filter: string): void {
    this.setState({
      filter,
      drawerOpen: false,
    });
  }

  public onReload = (): void => {
    window.location.reload();
  };

  public showDrawer = (): void => {
    this.setState({ drawerOpen: true });
  };

  public hideDrawer = (): void => {
    this.setState({ drawerOpen: false });
  };

  public toggleDrawer = (): void => {
    this.setState({ drawerOpen: !this.state.drawerOpen });
  };

  public renderToolbar = (): JSX.Element => {
    let title = 'マイタスク';
    if (this.state.filter === 'done') {
      title = '完了したタスク';
    } else if (this.state.filter === 'undone') {
      title = 'マイタスク';
    } else if (this.state.filter === 'removed') {
      title = 'ごみ箱';
    } else {
      title = 'すべてのタスク';
    }

    return (
      <Toolbar>
        <div className="left">
          <ToolbarButton onClick={this.toggleDrawer}>
            <FontAwesomeIcon icon={faBars} />
          </ToolbarButton>
        </div>
        <div className="center">{title}</div>
      </Toolbar>
    );
  };

  public renderFixed = (): JSX.Element => {
    let isRemoved = this.state.todos.filter((todo): boolean => todo.removed);
    if (this.state.filter === 'removed') {
      return (
        <Fab
          disabled={isRemoved.length !== 0 ? false : true}
          ripple
          position="bottom right"
          onClick={(): void => {
            ons.notification.confirm({
              title: '(´･ω･`)',
              message: 'ごみ箱を空にしますか？',
              buttonLabels: ['いいえ', 'はい'],
              cancelable: true,
              callback: (index: number): void => {
                if (index === 1) {
                  this.onDelete();
                }
              },
            });
            this.hideDrawer();
          }}>
          <FontAwesomeIcon icon={faTrash} />
        </Fab>
      );
    } else {
      return (
        <Fab
          disabled={this.state.filter !== 'undone' ? true : false}
          ripple
          position="bottom right"
          onClick={(): void => {
            ons.notification.prompt({
              title: '新しいタスク',
              message: 'タスクを入力...',
              buttonLabels: ['追加'],
              cancelable: true,
              callback: (title: string): void => {
                this.onSubmit(title);
              },
            });
            this.hideDrawer();
          }}>
          <FontAwesomeIcon icon={faPen} />
        </Fab>
      );
    }
  };

  public render(): JSX.Element {
    const filterTodos = this.state.todos.filter((todo): boolean | null => {
      const filter = this.state.filter;
      if (filter === 'all') {
        return !todo.removed;
      } else if (filter === 'done') {
        return todo.checked && !todo.removed;
      } else if (filter === 'undone') {
        return !todo.checked && !todo.removed;
      } else if (filter === 'removed') {
        return todo.removed;
      }
      return null;
    });

    const todoItems = filterTodos.map(
      (todo): JSX.Element => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onEdit={this.onEdit}
          onCheck={this.onCheck}
          onRemove={this.onRemove}
        />
      )
    );

    return (
      <Page renderToolbar={this.renderToolbar} renderFixed={this.renderFixed}>
        <Splitter>
          <SplitterSide
            side="left"
            width={250}
            collapse={true}
            swipeable={true}
            isOpen={this.state.drawerOpen}
            onClose={this.hideDrawer}
            onOpen={this.showDrawer}>
            <Drawer
              onFilter={(filter: string): void => this.onFilter(filter)}
              onReload={this.onReload}
            />
          </SplitterSide>
          <SplitterContent>
            <Page>
              <div className="card-container">{todoItems}</div>
            </Page>
          </SplitterContent>
        </Splitter>
      </Page>
    );
  }
}

export default App;
