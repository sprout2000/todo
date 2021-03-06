import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

import App from '../src/Components/App';

describe('App component', () => {
  test('render App component', () => {
    render(<App />);
  });
});
