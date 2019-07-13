import React from 'react';
import localforage from 'localforage';
import i18n from 'i18next';

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

import en from './locales/en.json';
import ja from './locales/ja.json';

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
    const locale =
      (window.navigator.languages && window.navigator.languages[0]) ||
      window.navigator.language;

    i18n.init({
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
      .getItem('todo-20190101')
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

  public componentDidUpdate(_prevProps: State, prevState: State): void {
    if (this.state.todos !== prevState.todos) {
      localforage
        .setItem('todo-20190101', this.state.todos)
        .catch((err): void => {
          console.error(err);
        });
    }
  }

  private onSubmit = (todo: string): void => {
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

  private onEdit = (id: number, val: string): void => {
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

  private onCheck = (id: number, val: boolean): void => {
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

  private onRemove = (id: number, val: boolean): void => {
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

  private onDelete = (): void => {
    const newTodos: Todo[] = this.state.todos.filter(
      (todo: Todo): boolean => todo.removed !== true
    );
    this.setState({
      todos: newTodos,
    });
  };

  private onFilter(filter: string): void {
    this.setState({
      filter,
      drawerOpen: false,
    });
  }

  private onReload = (): void => {
    window.location.reload();
  };

  private showDrawer = (): void => {
    this.setState({ drawerOpen: true });
  };

  private hideDrawer = (): void => {
    this.setState({ drawerOpen: false });
  };

  private toggleDrawer = (): void => {
    this.setState({ drawerOpen: !this.state.drawerOpen });
  };

  private renderToolbar = (): JSX.Element => {
    let title = i18n.t('tasks');
    if (this.state.filter === 'done') {
      title = i18n.t('done');
    } else if (this.state.filter === 'undone') {
      title = i18n.t('tasks');
    } else if (this.state.filter === 'removed') {
      title = i18n.t('trash');
    } else {
      title = i18n.t('all');
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

  private renderFixed = (): JSX.Element => {
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
              message: i18n.t('empty'),
              buttonLabels: [i18n.t('no'), i18n.t('yes')],
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
              title: i18n.t('new'),
              message: i18n.t('input'),
              buttonLabels: [i18n.t('add')],
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
