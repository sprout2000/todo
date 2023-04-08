import { isTodo, isTodos } from '../lib/isTodos';

const mockTodos = [
  { id: 0, value: 'hello', checked: false, removed: false },
  { id: 1, value: 'bye', checked: true, removed: true },
];

test('test isTodo()', () => {
  expect(isTodo(mockTodos[0])).toBeTruthy();
});

test('test isTodos()', () => {
  expect(isTodos(mockTodos)).toBeTruthy();
});
