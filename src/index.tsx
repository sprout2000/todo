import React from 'react';
import ReactDOM from 'react-dom';
import ons from 'onsenui';

import './index.css';
import App from './App';

ReactDOM.render(<App />, document.getElementById('root') as HTMLElement);

if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
  window.addEventListener('load', (): void => {
    navigator.serviceWorker.register('./service-worker.js');
  });
}

if (ons.platform.isIPhoneX()) {
  document.documentElement.setAttribute('onsflag-iphonex-portrait', '');
}
