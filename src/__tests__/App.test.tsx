import 'jest-canvas-mock';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { App } from '../App';

// mock for localforage
jest.mock('localforage', () => ({
  setItem: jest.fn(),
  getItem: jest.fn().mockResolvedValue([]),
}));

test('test App component', async () => {
  render(<App />);

  // handleToggleDialog & handleSubmit('')
  await userEvent.click(screen.getByLabelText('fab-add-button'));
  fireEvent.submit(screen.getByLabelText('todo-input'));

  // handleChange('#0') & handleSubmit('#0')
  await userEvent.click(screen.getByLabelText('fab-add-button'));
  await userEvent.type(screen.getByTestId('todo-input'), '#0');
  await userEvent.click(screen.getByLabelText('form-add'));

  // handleTodo('edit')
  await userEvent.type(screen.getByTestId('todo-#0'), '_edit');
  // handleTodo('check')
  await userEvent.click(screen.getByLabelText('todo-check-#0_edit'));
  expect(screen.getByLabelText('todo-toggle-#0_edit')).toHaveStyle(
    'color: rgb(255, 64, 129)'
  );
  // handleTodo('uncheck')
  await userEvent.click(screen.getByLabelText('todo-check-#0_edit'));
  expect(screen.getByLabelText('todo-toggle-#0_edit')).toHaveStyle(
    'color: rgb(3, 169, 244)'
  );
  // handleTodo('remove')
  await userEvent.click(screen.getByLabelText('todo-trash-#0_edit'));

  // handleToggleDrawer()
  await userEvent.click(screen.getByLabelText('menu-button'));
  await userEvent.click(screen.getByLabelText('list-removed'));
  expect(screen.getByLabelText('todo-check-#0_edit')).toBeInTheDocument();

  // handleToggleAlert(), handleEmpty()
  await userEvent.click(screen.getByLabelText('fab-delete-button'));
  await userEvent.click(screen.getByLabelText('alert-ok'));
  expect(screen.getByLabelText('fab-delete-button')).toBeDisabled();

  // handleSort('share')
  await userEvent.click(screen.getByLabelText('menu-button'));
  await userEvent.click(screen.getByLabelText('list-share'));
  expect(screen.getByTestId('qr')).toBeVisible();
});
