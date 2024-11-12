import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';

import store from './store';
import { Provider } from 'react-redux';

import { RouterProvider } from 'react-router-dom';
import router from './pages/router';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
);
