import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import CryptoProvider from './CryptoContext';

import App from './App';
import store from './app/store';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Router>
    <CryptoProvider>
    <Provider store={store}>
        <App />
      </Provider>
    </CryptoProvider>
    </Router>
  </React.StrictMode>
);