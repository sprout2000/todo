import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent, { specialChars } from '@testing-library/user-event';

import { FormDialog } from '../src/components/FormDialog';

describe('FormDialog compoenent', () => {
  test('render FormDialog component', async () => {
    const onChange = jest.fn();
    const onSubmit = jest.fn();
    const onToggle = jest.fn();

    render(
      <FormDialog
        dialogOpen={true}
        handleOnChange={onChange}
        handleOnSubmit={onSubmit}
        toggleDialog={onToggle}
        text=""
      />
    );

    userEvent.type(screen.getByRole('textbox'), 'Hello, World!');
    expect(onChange).toHaveBeenCalledTimes(13);

    userEvent.click(screen.getByRole('button'));
    expect(onSubmit).toHaveBeenCalledTimes(1);

    userEvent.type(screen.getByRole('dialog'), `${specialChars.escape}`);
    expect(onToggle).toHaveBeenCalledTimes(1);
  });
});
