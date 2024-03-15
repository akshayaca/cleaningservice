import React from 'react';
import { FaHotel, FaUser } from 'react-icons/fa';

const Header = () => {
  return (
    <header className="bg-gray-200 text-gray-700 body-font shadow w-full">
      <div className="container mx-auto flex items-center p-5 justify-between">
        {/* Left portion with hotel icon, only show the icon on smaller screens */}
        <div className="flex justify-start items-center">
          <FaHotel className="text-xl" />
          <span className="ml-2 text-xl hidden sm:inline">TorontoClean</span>
        </div>

        {/* Center portion with title, always show */}
        <div className="flex justify-center w-full absolute inset-x-0">
          <span className="text-xl font-semibold">
            Service Request Portal
          </span>
        </div>

        {/* Right portion with login icon, only show the icon on smaller screens */}
        <div className="flex justify-end items-center">
          <FaUser className="text-xl" />
          <span className="ml-2 text-xl hidden sm:inline">Account</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
