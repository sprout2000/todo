import React from 'react';
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
import TopBar from './TopBar';
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

interface State {
  todos: Todo[];
  newTitle: string;
  filter: string;
  drawerOpen: false;
  dialogOpen: false;
  alertOpen: false;
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

class App extends React.Component {
  public state: State = {
    todos: [],
    newTitle: '',
    filter: 'all',
    drawerOpen: false,
    dialogOpen: false,
    alertOpen: false,
  };

  public componentDidMount = (): void => {
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
          this.setState({ todos: [] });
        } else {
          this.setState({ todos: value });
        }
      })
      .catch((err) => console.error(err));
  };

  public componentDidUpdate = (_prevProps: State, prevState: State): void => {
    if (this.state.todos !== prevState.todos) {
      localforage
        .setItem('todo-20200101', this.state.todos)
        .catch((err): void => {
          console.error(err);
        });
    }
  };

  private toggleDrawer = (): void => {
    this.setState({ drawerOpen: !this.state.drawerOpen });
  };

  private toggleDialog = (): void => {
    this.setState({ dialogOpen: !this.state.dialogOpen });
    this.setState({ newTitle: '' });
  };

  private toggleAlert = (): void => {
    this.setState({ alertOpen: !this.state.alertOpen });
  };

  private handleOnChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    this.setState({ newTitle: e.target.value });
  };

  private handleOnSubmit = (): void => {
    if (!this.state.newTitle) {
      this.toggleDialog();
      return;
    }

    const newId = new Date().getTime();
    this.setState({
      todos: [
        {
          id: newId,
          title: this.state.newTitle,
          checked: false,
          removed: false,
        },
        ...this.state.todos,
      ],
    });
    this.toggleDialog();
  };

  private handleOnEdit = (id: number, title: string): void => {
    const newTodos = this.state.todos.map((todo) => {
      if (todo.id === id) {
        todo.title = title;
      }
      return todo;
    });

    this.setState({ todos: newTodos });
  };

  private handleOnCheck = (id: number, checked: boolean): void => {
    const newTodos = this.state.todos.map((todo) => {
      if (todo.id === id) {
        todo.checked = checked;
      }
      return todo;
    });

    this.setState({ todos: newTodos });
  };

  private handleOnRemove = (id: number, removed: boolean): void => {
    const newTodos = this.state.todos.filter((todo) => {
      if (todo.id === id) {
        todo.removed = removed;
      }
      return todo;
    });

    this.setState({ todos: newTodos });
  };

  private handleOnDelete = (): void => {
    const newTodos = this.state.todos.filter((todo) => !todo.removed);

    this.setState({ todos: newTodos });
  };

  private handleOnSort = (filter: string): void => {
    this.setState({ filter });
  };

  private setTitle = (): string => {
    if (this.state.filter === 'all') {
      return i18next.t('all');
    } else if (this.state.filter === 'complete') {
      return i18next.t('complete');
    } else if (this.state.filter === 'incomplete') {
      return i18next.t('incomplete');
    } else {
      return i18next.t('trash');
    }
  };

  public render = (): JSX.Element => {
    const filteredTodos = this.state.todos.filter((todo): boolean => {
      if (this.state.filter === 'complete') {
        return todo.checked && !todo.removed;
      } else if (this.state.filter === 'incomplete') {
        return !todo.checked && !todo.removed;
      } else if (this.state.filter === 'removed') {
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
            filter={this.state.filter}
            onEdit={this.handleOnEdit}
            onCheck={this.handleOnCheck}
            onRemove={this.handleOnRemove}
          />
        );
      }
    );

    const removed =
      this.state.todos.filter((todo): boolean => todo.removed).length !== 0;

    return (
      <React.Fragment>
        <CssBaseline />
        <TopBar title={this.setTitle()} toggleDrawer={this.toggleDrawer} />
        <SideBar
          toggleDrawer={this.toggleDrawer}
          drawerOpen={this.state.drawerOpen}
          handleOnSort={this.handleOnSort}
        />
        <FormDialog
          dialogOpen={this.state.dialogOpen}
          newTitle={this.state.newTitle}
          toggleDialog={this.toggleDialog}
          handleOnChange={(
            e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
          ): void => this.handleOnChange(e)}
          handleOnSubmit={this.handleOnSubmit}
        />
        <AlertDialog
          alertOpen={this.state.alertOpen}
          toggleAlert={this.toggleAlert}
          handleOnDelete={(): void => this.handleOnDelete()}
        />
        <Container>
          {todoItems}
          {this.state.filter === 'removed' ? (
            <FabButton
              aria-label='delete-button'
              color='secondary'
              onClick={this.toggleAlert}
              disabled={!removed || this.state.alertOpen}>
              <DeleteIcon />
            </FabButton>
          ) : (
            <FabButton
              aria-label='add-button'
              color='secondary'
              onClick={this.toggleDialog}
              disabled={this.state.filter !== 'all' || this.state.dialogOpen}>
              <CreateIcon />
            </FabButton>
          )}
        </Container>
      </React.Fragment>
    );
  };
}

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
