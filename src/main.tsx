import React from 'react';
import ReactDOM from 'react-dom';

import 'typeface-roboto';

import i18next from 'i18next';
import en from './locales/en.json';
import ja from './locales/ja.json';

import { App } from './components/App';

const locale =
  (window.navigator.languages && window.navigator.languages[0]) ||
  window.navigator.language;

i18next.init({
  lng: locale,
  fallbackLng: 'en',
  resources: {
    en: { translation: en },
    ja: { translation: ja },
  },
});

if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('./service-worker.js')
      .then((registration) => {
        console.log('SW registered: ', registration);
      })
      .catch((registrationError) => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}

ReactDOM.render(<App />, document.getElementById('root'));
