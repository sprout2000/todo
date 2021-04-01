import React, { useContext, memo } from 'react';

import { AppContext } from './App';

import { AddButton } from './AddButton';
import { DeleteButton } from './DeleteButton';

export const Buttons: React.FC = memo(() => {
  const { state } = useContext(AppContext);
  return state.filter === 'removed' ? <DeleteButton /> : <AddButton />;
});

Buttons.displayName = 'Buttons';
