import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent, { specialChars } from '@testing-library/user-event';

import { SideBar } from '../src/components/SideBar';

describe('SideBar component', () => {
  test('render SideBar component', () => {
    const onToggle = jest.fn();
    const onSort = jest.fn();

    render(
      <SideBar
        drawerOpen={true}
        toggleDrawer={onToggle}
        handleOnSort={onSort}
      />
    );

    const all = screen.getByRole('button', { name: 'すべてのタスク' });
    const todo = screen.getByRole('button', { name: 'マイタスク' });
    const done = screen.getByRole('button', { name: '完了したタスク' });
    const trash = screen.getByRole('button', { name: 'ごみ箱' });

    expect(all).toBeInTheDocument();
    expect(todo).toBeInTheDocument();
    expect(done).toBeInTheDocument();
    expect(trash).toBeInTheDocument();

    userEvent.click(all);
    expect(onSort).toBeCalledTimes(1);
    expect(onToggle).toBeCalledTimes(1);

    userEvent.click(todo);
    expect(onSort).toBeCalledTimes(2);
    expect(onToggle).toBeCalledTimes(2);

    userEvent.click(done);
    expect(onSort).toBeCalledTimes(3);
    expect(onToggle).toBeCalledTimes(3);

    userEvent.click(trash);
    expect(onSort).toBeCalledTimes(4);
    expect(onToggle).toBeCalledTimes(4);

    userEvent.type(screen.getByRole('list'), `${specialChars.escape}`);
    expect(onToggle).toBeCalledTimes(6);
  });
});
