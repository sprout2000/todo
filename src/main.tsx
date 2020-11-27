import React from 'react';
import ReactDOM from 'react-dom';

import App from './Components/App';
import { forceScreenSize } from './forceScreenSize';

if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
  window.addEventListener('resize', () => {
    forceScreenSize(400, 640);
  });

  window.addEventListener('load', () => {
    forceScreenSize(400, 640);
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
