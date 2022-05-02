import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

function capitalize(str) {
  return str[0].toUpperCase() + str.slice(1)
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

export {capitalize}