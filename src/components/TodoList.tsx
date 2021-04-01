import React, { useContext, memo } from 'react';

import { TodoItem } from './TodoItem';
import { AppContext } from './App';

export const TodoList: React.FC = memo(() => {
  const { state } = useContext(AppContext);

  const RenderTodos: JSX.Element[] = state.todos
    .filter((todo) => {
      switch (state.filter) {
        case 'complete':
          return todo.checked && !todo.removed;
        case 'incomplete':
          return !todo.checked && !todo.removed;
        case 'removed':
          return todo.removed;
        case 'all':
          return !todo.removed;
        default:
          return todo;
      }
    })
    .map((todo) => {
      return <TodoItem key={todo.id} todo={todo} />;
    });

  return <div>{RenderTodos}</div>;
});

TodoList.displayName = 'TodoList';
