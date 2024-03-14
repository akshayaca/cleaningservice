// index.js
import React from 'react';
import ReactDOM from 'react-dom';
import { StrictMode } from 'react'; // Import StrictMode from React
import App from './components/App.js';

ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById('root')
);
