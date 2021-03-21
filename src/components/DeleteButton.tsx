import React, { useContext, memo } from 'react';

import { AppContext } from './App';

import { FabButton } from './FabButton';
import DeleteIcon from '@material-ui/icons/DeleteRounded';

export const DeleteButton: React.FC = memo(() => {
  const { state, dispatch } = useContext(AppContext);

  const removed = state.todos.filter((todo) => todo.removed).length !== 0;

  return (
    <FabButton
      aria-label="delete-button"
      color="secondary"
      onClick={() => dispatch({ type: 'alert', value: !state.alertOpen })}
      disabled={!removed || state.alertOpen}
    >
      <DeleteIcon />
    </FabButton>
  );
});

DeleteButton.displayName = 'DelteButton';
