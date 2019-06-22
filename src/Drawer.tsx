import React from 'react';

import { Page, List, ListItem } from 'react-onsenui';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPen,
  faCheckCircle,
  faTrash,
  faRedo,
} from '@fortawesome/free-solid-svg-icons';

import pjson from '../package.json';

interface Props {
  onFilter: Function;
  onReload: Function;
}

const Drawer = (props: Props): JSX.Element => {
  const version = pjson.version;
  return (
    <Page>
      <List className="drawer">
        <div className="drawer-header">
          <p>シンプルTODO</p>
          <p>{version}</p>
        </div>
        <ListItem tappable onClick={(): void => props.onFilter('undone')}>
          <div className="left">
            <FontAwesomeIcon
              icon={faCheckCircle}
              style={{ color: '#007aff' }}
            />
          </div>
          <div className="center drawer-text">マイタスク</div>
        </ListItem>
        <ListItem tappable onClick={(): void => props.onFilter('done')}>
          <div className="left">
            <FontAwesomeIcon
              icon={faCheckCircle}
              style={{ color: '#FF4081' }}
            />
          </div>
          <div className="center drawer-text">完了したタスク</div>
        </ListItem>
        <ListItem tappable onClick={(): void => props.onFilter('all')}>
          <div className="left">
            <FontAwesomeIcon icon={faPen} style={{ color: '#000000' }} />
          </div>
          <div className="center drawer-text">すべてのタスク</div>
        </ListItem>
        <ListItem tappable onClick={(): void => props.onFilter('removed')}>
          <div className="left">
            <FontAwesomeIcon icon={faTrash} style={{ color: '#777' }} />
          </div>
          <div className="center drawer-text">ごみ箱</div>
        </ListItem>
        <ListItem tappable onClick={(): void => props.onReload()}>
          <div className="left">
            <FontAwesomeIcon icon={faRedo} style={{ color: '#777' }} />
          </div>
          <div className="center drawer-text">アプリを再読込み</div>
        </ListItem>
        <div className="drawer-footer" />
      </List>
    </Page>
  );
};

export default Drawer;
