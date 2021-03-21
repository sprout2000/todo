import { Todo } from './Todo';
import { State } from './State';
import { Action } from './Action';

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'localforage':
      return { ...state, todos: action.value };
    case 'drawer':
      return { ...state, drawerOpen: action.value };
    case 'dialog':
      return { ...state, dialogOpen: action.value };
    case 'text':
      return { ...state, text: action.value };
    case 'edit': {
      const newTodos = action.value.map((todo) => {
        if (todo.id === action.id) {
          todo.title = action.val;
        }
        return todo;
      });
      return { ...state, todos: newTodos };
    }
    case 'check': {
      const newTodos = action.value.map((todo) => {
        if (todo.id === action.id) {
          todo.checked = action.checked;
        }
        return todo;
      });
      return { ...state, todos: newTodos };
    }
    case 'remove': {
      const newTodos = action.value.map((todo) => {
        if (todo.id === action.id) {
          todo.removed = action.removed;
        }
        return todo;
      });
      return { ...state, todos: newTodos };
    }
    case 'submit': {
      if (!state.text) {
        return { ...state, dialogOpen: false };
      }
      const newId = new Date().getTime();
      const oldTodos = state.todos.slice();
      const newTodo: Todo = {
        id: newId,
        title: state.text,
        checked: false,
        removed: false,
      };
      return {
        ...state,
        todos: [newTodo, ...oldTodos],
        dialogOpen: false,
        text: '',
      };
    }
    case 'qr':
      return { ...state, qrOpen: action.value };
    case 'alert':
      return { ...state, alertOpen: action.value };
    case 'delete': {
      const newTodos = state.todos.filter((todo) => !todo.removed);
      return { ...state, todos: newTodos };
    }
    case 'sort':
      return { ...state, filter: action.value };

    default:
      return state;
  }
};
