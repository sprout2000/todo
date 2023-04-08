import { render } from '@testing-library/react';

import { TodoItem } from '../TodoItem';

const mockTodos: Todo[] = [
  { id: 0, value: 'item0', checked: true, removed: true },
  { id: 1, value: 'item1', checked: true, removed: false },
  { id: 2, value: 'item2', checked: false, removed: true },
  { id: 3, value: 'item3', checked: false, removed: false },
];

const filters: Filter[] = [
  'all',
  'checked',
  'removed',
  'unchecked',
  'todo' as Filter,
];

test('render TodoItem component with filter', async () => {
  filters.map((filter) =>
    render(
      <TodoItem filter={filter} todos={mockTodos} onTodo={() => jest.fn()} />
    )
  );
});
