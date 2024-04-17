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
  const { isLoggedIn, login,isAuthenticated } = useAuth();
  let location = useLocation();

  return (
    <div className="App">
      {location.pathname !== '/login' && <Header />} {/* Conditionally render Header */}
      <main className='main-content'>
        <Routes>
          <Route path="/login" element={isAuthenticated ? <Navigate to="/" replace /> : <Login />} />
          <Route path="/" element={isAuthenticated ? <ServiceListing /> : <Navigate to="/login" replace />} />
          <Route path="/api/request/:id" element={<RequestDetails />} />
          {/* More routes as needed */}
        </Routes>
      </main>
    </div>
  );
};

export default AppWrapper;