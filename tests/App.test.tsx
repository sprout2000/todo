import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from '../src/Components/App';

describe('App component', () => {
  test('render App component', () => {
    render(<App />);

    expect(screen.getByTestId(/title/)).toHaveTextContent('すべてのタスク');

    userEvent.click(screen.getByRole('button', { name: /menu/ }));
    expect(screen.getByText(/ごみ箱/)).toBeInTheDocument();
    userEvent.click(screen.getAllByRole('presentation')[0]);

    userEvent.click(screen.getByRole('button', { name: /すべてのタスク/ }));
    expect(screen.getByTestId(/title/)).toHaveTextContent('すべてのタスク');
    expect(
      screen.getByRole('button', { name: 'add-button' })
    ).toBeInTheDocument();

    userEvent.click(screen.getByRole('button', { name: /menu/ }));
    userEvent.click(screen.getByRole('button', { name: /マイタスク/ }));
    expect(screen.getByTestId(/title/)).toHaveTextContent('マイタスク');
    expect(
      screen.getByRole('button', { name: 'add-button' })
    ).toBeInTheDocument();

    userEvent.click(screen.getByRole('button', { name: /menu/ }));
    userEvent.click(screen.getByRole('button', { name: /完了したタスク/ }));
    expect(screen.getByTestId(/title/)).toHaveTextContent('完了したタスク');
    expect(screen.getByRole('button', { name: 'add-button' })).toHaveAttribute(
      'disabled'
    );

    userEvent.click(screen.getByRole('button', { name: /menu/ }));
    userEvent.click(screen.getByRole('button', { name: /ごみ箱/ }));
    expect(screen.getByTestId(/title/)).toHaveTextContent('ごみ箱');
    expect(
      screen.getByRole('button', { name: 'delete-button' })
    ).toBeInTheDocument();
  });
});
