import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { App } from '../src/components/App';

describe('App component', () => {
  test('render App component', () => {
    render(<App />);

    const menu = screen.getByRole('button', { name: 'menu' });
    const add = screen.getByRole('button', { name: 'add-button' });

    userEvent.click(menu);
    expect(screen.getByRole('list')).toBeVisible();

    userEvent.click(screen.getByRole('button', { name: 'マイタスク' }));
    expect(screen.getByTestId('title')).toBeVisible();

    userEvent.click(add);
    expect(screen.getByRole('dialog')).toBeVisible();
  });
});
