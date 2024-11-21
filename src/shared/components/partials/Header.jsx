import React from 'react';
import { FaSearch, FaAngleDown } from 'react-icons/fa';
import { BsBell } from 'react-icons/bs';

const Header = () => {
  return (
    <div className="navbar bg-gray-900 text-white p-4">
      <div className="content flex items-center justify-between max-w-6xl mx-auto">
        {/* Logo */}
        <h1 className="text-2xl font-bold">MUZEUM</h1>

        {/* Search Bar */}
        <div className="flex items-center gap-2">
          <FaSearch className="text-amber-50 text-xl" />
          <input
            type="text"
            placeholder="Search art styles, artist, etc."
            className="search border border-gray-700 bg-gray-800 rounded-lg px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 text-white"
          />
        </div>

        {/* Notification and Profile */}
        <div className="flex items-center gap-4">
          <button className="notifBtn">
            <BsBell className="text-amber-50 text-xl" />
          </button>
          <span className="profile text-sm font-medium">profile</span>
          <button className="dropDown flex items-center">
            <FaAngleDown className="text-amber-50 text-lg" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
