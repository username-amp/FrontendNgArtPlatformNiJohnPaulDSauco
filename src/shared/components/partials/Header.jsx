import React, { useState } from 'react';
import { FaSearch, FaAngleDown } from 'react-icons/fa';
import { BsBell } from 'react-icons/bs';
import { MdOutlineMenu } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';  
import Cookies from 'js-cookie';  

const Header = ({ toggleSidebar }) => {

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const navigate = useNavigate(); 


  const handleLogout = () => {
    Cookies.remove("token");
    Cookies.remove("user_id");
  
    console.log('User logged out');
    navigate('/signin');  
  };


  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="navbar bg-transparent text-white p-4">
      <div className="content flex items-center justify-between max-w-full w-full">

        <button
          className="menu-icon md:hidden sm:mr-5 text-2xl text-white"
          onClick={toggleSidebar}
        >
          <MdOutlineMenu />
        </button>

        <div className="flex items-center gap-2 w-full pr-3">
          <FaSearch className="text-amber-50 text-xl" />
          <input
            type="text"
            placeholder="Search art styles, artist, etc."
            className="search flex-grow border border-gray-700 bg-gray-800 rounded-lg px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 text-white"
          />
        </div>

        <div className="flex items-center gap-4">
          <button className="notifBtn">
            <BsBell className="text-amber-50 text-xl" />
          </button>
          <span className="profile text-sm font-medium">profile</span>
          <button
            className="dropDown flex items-center"
            onClick={toggleDropdown}
          >
            <FaAngleDown className="text-amber-50 text-lg" />
          </button>

  
          {isDropdownOpen && (
            <div className="absolute top-12 right-4 bg-gray-800 text-white p-3 rounded-lg shadow-lg z-50">
              <button
                className="block text-sm px-4 py-2 hover:bg-gray-700 rounded"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
