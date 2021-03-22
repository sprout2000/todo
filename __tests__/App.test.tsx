import React from 'react';
import 'jest-canvas-mock';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { App } from '../src/components/App';

describe('App component', () => {
  test('render App', () => {
    render(<App />);

    expect(screen.getByRole('banner')).toBeVisible();
    expect(screen.getByRole('button', { name: 'menu' })).toBeVisible();
    expect(screen.getByRole('button', { name: 'add-button' })).toBeVisible();

    userEvent.click(screen.getByRole('button', { name: 'menu' }));
    expect(screen.getByRole('list')).toBeVisible();
  });
});
