import React from 'react';
import i18n from 'i18next';

import { Page, List, ListItem } from 'react-onsenui';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPen,
  faCheckCircle,
  faTrash,
  faRedo,
} from '@fortawesome/free-solid-svg-icons';

import pjson from '../package.json';
import en from './locales/en.json';
import ja from './locales/ja.json';

interface Props {
  onFilter: Function;
  onReload: Function;
}

const Drawer = (props: Props): JSX.Element => {
  const version = pjson.version;
  const locale =
    (window.navigator.languages && window.navigator.languages[0]) ||
    window.navigator.language;

  i18n.init({
    lng: locale,
    fallbackLng: 'en',
    resources: {
      en: {
        translation: en,
      },
      ja: {
        translation: ja,
      },
    },
  });

  const title = i18n.t('title');
  const tasks = i18n.t('tasks');
  const done = i18n.t('done');
  const all = i18n.t('all');
  const trash = i18n.t('trash');
  const reload = i18n.t('reload');

  return (
    <Page>
      <List className="drawer">
        <div className="drawer-header">
          <p>{title}</p>
          <p>{version}</p>
        </div>
        <ListItem tappable onClick={(): void => props.onFilter('undone')}>
          <div className="left">
            <FontAwesomeIcon
              icon={faCheckCircle}
              style={{ color: '#007aff' }}
            />
          </div>
          <div className="center drawer-text">{tasks}</div>
        </ListItem>
        <ListItem tappable onClick={(): void => props.onFilter('done')}>
          <div className="left">
            <FontAwesomeIcon
              icon={faCheckCircle}
              style={{ color: '#FF4081' }}
            />
          </div>
          <div className="center drawer-text">{done}</div>
        </ListItem>
        <ListItem tappable onClick={(): void => props.onFilter('all')}>
          <div className="left">
            <FontAwesomeIcon icon={faPen} style={{ color: '#000000' }} />
          </div>
          <div className="center drawer-text">{all}</div>
        </ListItem>
        <ListItem tappable onClick={(): void => props.onFilter('removed')}>
          <div className="left">
            <FontAwesomeIcon icon={faTrash} style={{ color: '#777' }} />
          </div>
          <div className="center drawer-text">{trash}</div>
        </ListItem>
        <ListItem tappable onClick={(): void => props.onReload()}>
          <div className="left">
            <FontAwesomeIcon icon={faRedo} style={{ color: '#777' }} />
          </div>
          <div className="center drawer-text">{reload}</div>
        </ListItem>
        <div className="drawer-footer" />
      </List>
    </Page>
  );
};

export default Drawer;
