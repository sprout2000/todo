import React, { useContext, memo } from 'react';

import { AppContext } from './App';

import { FabButton } from './FabButton';
import CreateIcon from '@material-ui/icons/CreateRounded';

export const AddButton: React.FC = memo(() => {
  const { state, dispatch } = useContext(AppContext);

  return (
    <FabButton
      aria-label="add-button"
      color="secondary"
      onClick={() => dispatch({ type: 'dialog', value: !state.dialogOpen })}
      disabled={state.filter === 'complete' || state.dialogOpen}
    >
      <CreateIcon />
    </FabButton>
  );
});

AddButton.displayName = 'AddButton';
