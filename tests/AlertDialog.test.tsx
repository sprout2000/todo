import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { AlertDialog } from '../src/Components/AlertDialog';

describe('AlertDialog component', () => {
  test('render AlertDialog component', () => {
    const onDelete = jest.fn();
    const onToggle = jest.fn();

    render(
      <AlertDialog
        alertOpen={true}
        handleOnDelete={onDelete}
        toggleAlert={onToggle}
      />
    );

    // screen.getByRole('');

    expect(screen.getByText('アラート')).toBeInTheDocument();
    expect(
      screen.getByText('本当にごみ箱を完全に空にしますか?')
    ).toBeInTheDocument();
    expect(
      screen.getByText('この操作は取り消しできません。')
    ).toBeInTheDocument();

    expect(
      screen.getByRole('button', { name: 'キャンセル' })
    ).toBeInTheDocument();
    userEvent.click(screen.getByRole('button', { name: 'キャンセル' }));
    expect(onToggle).toBeCalledTimes(1);

    expect(screen.getByRole('button', { name: 'OK' })).toBeInTheDocument();
    userEvent.click(screen.getByRole('button', { name: 'OK' }));
    expect(onDelete).toBeCalledTimes(1);
    expect(onToggle).toBeCalledTimes(2);
  });
});
