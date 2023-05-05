export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'toggleQR': {
      return { ...state, qrOpen: !state.qrOpen };
    }
    case 'toggleAlert': {
      return { ...state, alertOpen: !state.alertOpen };
    }
    case 'toggleDialog': {
      return { ...state, dialogOpen: !state.dialogOpen };
    }
    case 'toggleDrawer': {
      return { ...state, drawerOpen: !state.drawerOpen };
    }
    case 'handleChange': {
      return { ...state, text: action.text };
    }
    case 'handleSubmit': {
      if (!state.text) {
        return { ...state, dialogOpen: !state.dialogOpen };
      } else {
        const newTodo: Todo = {
          value: state.text,
          id: new Date().getTime(),
          checked: false,
          removed: false,
        };

        return {
          ...state,
          todos: [newTodo, ...state.todos],
          text: '',
          dialogOpen: !state.dialogOpen,
        };
      }
    }
    case 'handleTodo': {
      const newTodos = state.todos.map((todo) => {
        if (todo.id === action.id) {
          return { ...todo, [action.key]: action.value };
        } else {
          return todo;
        }
      });

      return { ...state, todos: newTodos };
    }
    case 'handleEmpty':
      return { ...state, todos: state.todos.filter((todo) => !todo.removed) };
    case 'handleSort': {
      return { ...state, filter: action.filter };
    }
    case 'localforage': {
      return { ...state, todos: action.values };
    }
  }
};
