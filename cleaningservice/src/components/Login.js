import React, { useState } from 'react';
import { FaHotel } from 'react-icons/fa';

const LoginHeader = () => {
  return (
    <header className="bg-gray-200 text-gray-700 body-font shadow w-full fixed top-0 left-0 z-10">
      <div className="container mx-auto flex items-center p-5 justify-between">
        <div className="flex justify-start items-center">
          <FaHotel className="text-xl" />
          <span className="ml-2 text-xl hidden sm:inline">TorontoClean</span>
        </div>
        <div className="flex justify-center w-full">
          <span className="text-xl font-semibold">
            Service Request Portal
          </span>
        </div>
      </div>
    </header>
  );
};
const LoginFooter = () => {
    const currentYear = new Date().getFullYear();
    return (
        <footer className="bg-gray-200 p-6 w-full fixed bottom-0 left-0">
            <div className="container mx-auto flex justify-center items-center">
                <span className="text-gray-600">© {currentYear} Ezrest, Inc.</span>
            </div>
        </footer>
    );
};

const Login = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5001/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      if (data.success) {
        onLoginSuccess();
      } else {
        setError('Invalid credentials');
      }
    } catch (error) {
      setError('Failed to login');
    }
  }
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <LoginHeader />
      <div className="flex-grow flex items-center justify-center px-4 sm:px-6 lg:px-8" style={{ paddingTop: '64px', paddingBottom: '64px' }}>
        <div className="w-full max-w-md">
          <form onSubmit={handleLogin} className="bg-white shadow-md rounded px-8 pt-6 pb-8">
            <div className="mb-4">
              <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">Username</label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Password</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="flex items-center justify-between">
              <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                Login
              </button>
              {error && <p className="text-red-500 text-xs italic">{error}</p>}
            </div>
          </form>
        </div>
      </div>
      <LoginFooter />
    </div>
  );
};

export default Login;