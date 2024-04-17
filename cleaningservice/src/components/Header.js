import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext'; // Make sure the path is correct
import { useNavigate } from 'react-router-dom'; // Import useNavigate instead of useHistory
import { FaHotel, FaUser, FaCaretDown } from 'react-icons/fa';

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { logout } = useAuth(); // Use the logout function from AuthContext
  const navigate = useNavigate(); // Initialize useNavigate hook

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const handleLogout = () => {
    logout(); // Call logout from AuthContext
    navigate('/login'); // Navigate to login page after logout
  };

  return (
    <header className="bg-gray-200 text-gray-700 body-font shadow w-full">
      <div className="container mx-auto flex items-center p-5 justify-between">
        <div className="flex justify-start items-center">
          <FaHotel className="text-xl" />
          <span className="ml-2 text-xl hidden sm:inline">TorontoClean</span>
        </div>

        <div className="flex justify-center w-full absolute inset-x-0">
          <span className="text-xl font-semibold">
            Service Request Portal
          </span>
        </div>

        <div className="flex justify-end items-center relative">
          <div onClick={toggleDropdown} className="flex items-center cursor-pointer">
            <FaUser className="text-xl" />
            <span className="ml-2 text-xl hidden sm:inline">Account</span>
            <FaCaretDown className="ml-1" />
          </div>
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-md shadow-xl z-20">
              <a
                href="#logout"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={(e) => {
                  e.preventDefault();
                  handleLogout(); // Use handleLogout for the logout process
                }}
              >
                Log Out
              </a>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;