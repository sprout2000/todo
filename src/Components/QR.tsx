import React from 'react';
import Backdrop from '@material-ui/core/Backdrop';

import { QRCode } from 'react-qrcode-logo';

import createStyles from '@material-ui/core/styles/createStyles';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) =>
  createStyles({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
    },
  })
);

interface Props {
  open: boolean;
  onClose: () => void;
}

const QR: React.FC<Props> = (props) => {
  const classes = useStyles();

  return (
    <Backdrop
      className={classes.backdrop}
      open={props.open}
      onClick={props.onClose}>
      <QRCode value="https://sprout2000.github.io/todo" />
    </Backdrop>
  );
};

export default QR;
