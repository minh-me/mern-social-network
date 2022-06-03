import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'react-toastify/dist/ReactToastify.css';
import App from './App';
import { ToastContainer } from 'react-toastify';

import { ReactQueryProvider } from '~/lib/ReactQueryProvider';
import { AppContextProvider } from '~/context/ContextProvider';

ReactDOM.render(
  <React.StrictMode>
    <ReactQueryProvider>
      <AppContextProvider>
        <App />

        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </AppContextProvider>
    </ReactQueryProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
