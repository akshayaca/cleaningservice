import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.js'; // Adjust if you have a different file structure
import { AuthProvider } from './contexts/AuthContext';
import './css/App.css';

ReactDOM.render(
    <AuthProvider>
      <App />
    </AuthProvider>,
  document.getElementById('root')
);
