import React, { useContext, memo } from 'react';
import Backdrop from '@material-ui/core/Backdrop';

import { QRCode } from 'react-qrcode-logo';

import { makeStyles } from '@material-ui/core/styles';
import createStyles from '@material-ui/core/styles/createStyles';

import { AppContext } from './App';

const useStyles = makeStyles((theme) =>
  createStyles({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
    },
  })
);

export const QR: React.FC = memo(() => {
  const classes = useStyles();
  const { state, dispatch } = useContext(AppContext);

  return (
    <Backdrop
      className={classes.backdrop}
      open={state.qrOpen}
      onClick={() => dispatch({ type: 'qr', value: false })}
    >
      <QRCode value="https://sprout2000.github.io/todo" />
    </Backdrop>
  );
});

QR.displayName = 'QR';
