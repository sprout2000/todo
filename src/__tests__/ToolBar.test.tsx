import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { ToolBar, translator } from '../ToolBar';

test('test translator', () => {
  expect(translator('all')).toBe('すべてのタスク');
  expect(translator('unchecked')).toBe('現在のタスク');
  expect(translator('checked')).toBe('完了したタスク');
  expect(translator('removed')).toBe('ごみ箱');
  expect(translator('TODO' as Filter)).toBe('TODO');
});

test('render ToolBar', async () => {
  const spy = jest.fn();
  render(<ToolBar filter="all" onToggleDrawer={spy} />);

  await userEvent.click(screen.getByLabelText('menu-button'));
  expect(spy).toHaveBeenCalled();
});
