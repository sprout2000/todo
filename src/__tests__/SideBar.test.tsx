import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { SideBar } from '../SideBar';

test('render SideBar component', async () => {
  const spy = jest.fn();
  render(
    <SideBar
      drawerOpen={true}
      onSort={spy}
      onToggleQR={spy}
      onToggleDrawer={spy}
    />
  );

  await userEvent.click(screen.getByLabelText('list-all'));
  expect(spy).toHaveBeenCalledTimes(2);
  await userEvent.click(screen.getByLabelText('list-unchecked'));
  expect(spy).toHaveBeenCalledTimes(4);
  await userEvent.click(screen.getByLabelText('list-checked'));
  expect(spy).toHaveBeenCalledTimes(6);
  await userEvent.click(screen.getByLabelText('list-removed'));
  expect(spy).toHaveBeenCalledTimes(8);
  await userEvent.click(screen.getByLabelText('list-share'));
  expect(spy).toHaveBeenCalledTimes(10);
});
