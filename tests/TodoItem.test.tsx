import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { TodoItem } from '../src/components/TodoItem';
import { Todo } from '../src/Todo';
import { Filter } from '../src/Filter';

describe('TodoItem component', () => {
  const todo: Todo = { id: 0, checked: true, removed: false, title: 'test' };
  const filter: Filter = 'all';

  const onCheck = jest.fn();
  const onEdit = jest.fn();
  const onRemove = jest.fn();

  test('render TodoItem component', async () => {
    render(
      <TodoItem
        todo={todo}
        filter={filter}
        onCheck={onCheck}
        onEdit={onEdit}
        onRemove={onRemove}
      />
    );

    const textbox = screen.getByRole('textbox');
    expect(textbox).toHaveValue('test');

    const done = screen.getByRole('button', { name: /Done/i });
    userEvent.click(done);
    expect(onCheck).toBeCalledTimes(1);
  });
});
