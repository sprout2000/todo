import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { ToolBar } from '../src/components/ToolBar';

describe('ToolBar component', () => {
  test('render ToolBar component', () => {
    const toggle = jest.fn();
    render(<ToolBar title="Test" toggleDrawer={toggle} />);

    expect(screen.getByText('Test')).toBeInTheDocument();

    const menu = screen.getByRole('button', { name: 'menu' });
    userEvent.click(menu);
    expect(toggle).toHaveBeenCalledTimes(1);
  });
});
