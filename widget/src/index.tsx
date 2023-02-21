
import App from './App';
import './index.css';
import ReactDOM from 'react-dom/client';
import React from 'react';
import dotenv from 'dotenv'
dotenv.config();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);