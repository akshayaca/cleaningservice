// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext'; // Adjust the path as necessary
import ServiceListing from './ServiceListing';
import RequestDetails from './RequestDetails';
import Login from './Login';
import Header from './Header'; // Your main header
import '../css/App.css';

const AppWrapper = () => {
  return (
    <Router>
      <App />
    </Router>
  );
};

const App = () => {
  const { isLoggedIn, login } = useAuth();
  let location = useLocation();

  return (
    <div className="App">
      {location.pathname !== '/login' && <Header />} {/* Conditionally render Header */}
      <main className='main-content'>
        <Routes>
          <Route path="/login" element={isLoggedIn ? <Navigate to="/" replace /> : <Login onLoginSuccess={login} />} />
          <Route path="/" element={isLoggedIn ? <ServiceListing /> : <Navigate to="/login" replace />} />
          <Route path="/request/:id" element={<RequestDetails />} />
          {/* More routes as needed */}
        </Routes>
      </main>
    </div>
  );
};

export default AppWrapper;
