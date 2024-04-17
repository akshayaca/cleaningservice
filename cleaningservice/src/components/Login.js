import React, { useState,useContext,useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import for redirection
import { AuthContext } from '../contexts/AuthContext'; 
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

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { isAuthenticated, login } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/'); // Redirect when already logged in
    }
  }, [isAuthenticated, navigate]);
  const handleLogin = async (e) => {
      e.preventDefault();
      try {
          await login(email, password);
      } catch (error) {
          setError('Failed to login'); // Handle errors from login function
      }
  };
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <LoginHeader />
      <div className="flex-grow flex items-center justify-center px-4 sm:px-6 lg:px-8" style={{ paddingTop: '64px', paddingBottom: '64px' }}>
        <div className="w-full max-w-md">
          <form onSubmit={handleLogin} className="bg-white shadow-md rounded px-8 pt-6 pb-8">
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Username</label>
              <input
                id="email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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