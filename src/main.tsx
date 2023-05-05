import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { registerSW } from 'virtual:pwa-register';

import i18next from 'i18next';
import en from './locales/en.json';
import ja from './locales/ja.json';

const locale =
  (navigator.languages && navigator.languages[0]) || navigator.language;

i18next.init({
  lng: locale,
  fallbackLng: 'en',
  resources: {
    en: { translation: en },
    ja: { translation: ja },
  },
});

import { App } from './App';

createRoot(document.getElementById('root') as Element).render(
  <StrictMode>
    <App />
  </StrictMode>
);

registerSW();
