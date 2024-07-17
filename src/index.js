import React from 'react';
import ReactDOM from 'react-dom/client';
import "./App.css"
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore} from '@reduxjs/toolkit';
import rootReducer from './reducer/rootReducer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
  QueryClient,
  QueryClientProvider,
} from 'react-query'

const store1 = configureStore({
  reducer:rootReducer
})

const queryClient = new QueryClient()

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store1}>
      <BrowserRouter>
    <QueryClientProvider client={queryClient}>
          <App />
          <ToastContainer/>
      </QueryClientProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

