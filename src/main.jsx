import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { TransactionsProvider } from './context/TransactionContext';

const root = document.getElementById('root');

const appRoot = ReactDOM.createRoot(root);
appRoot.render(
  <React.StrictMode>
    <TransactionsProvider>
      <App />
    </TransactionsProvider>
  </React.StrictMode>
);
