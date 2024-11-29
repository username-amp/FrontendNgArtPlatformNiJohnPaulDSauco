import React from 'react';
import { NavLink } from 'react-router-dom';
import { GoHome } from 'react-icons/go';
import { GrGallery } from 'react-icons/gr';
import { CiStar } from 'react-icons/ci';
import { FaRegTrashAlt } from 'react-icons/fa';
import { CiSettings } from 'react-icons/ci';

const Sidebar = ({ isOpen, closeSidebar, openCreateForm }) => {
  return (
    <div
      className={`fixed top-0 left-0 h-full bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-lg transition-all transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } md:translate-x-0 w-64 rounded-r-3xl`}
    >
      <div className="p-6 flex flex-col h-full">
        {/* Sidebar Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-extrabold tracking-wider">MUZEUM</h1>
          <button className="text-2xl md:hidden" onClick={closeSidebar}>
            ✖
          </button>
        </div>

        {/* Create Button */}
        <button
          className="bg-white text-gray-900 shadow-lg px-4 py-3 rounded-lg hover:bg-blue-600 mt-4 transition duration-300 ease-in-out"
          onClick={openCreateForm}
        >
          Create
        </button>

        {/* Navigation Links */}
        <div className="flex flex-col gap-8 flex-grow mt-6">
          <NavLink
            to="/home"
            className={({ isActive }) =>
              `flex items-center gap-4 text-lg font-semibold hover:text-yellow-400 transition duration-200 ease-in-out ${
                isActive ? 'text-yellow-400' : 'text-gray-200'
              }`
            }
          >
            <GoHome className="text-2xl" />
            <span>Home</span>
          </NavLink>

          <NavLink
            to="/gallery"
            className={({ isActive }) =>
              `flex items-center gap-4 text-lg font-semibold hover:text-yellow-400 transition duration-200 ease-in-out ${
                isActive ? 'text-yellow-400' : 'text-gray-200'
              }`
            }
          >
            <GrGallery className="text-2xl" />
            <span>Gallery</span>
          </NavLink>

          <NavLink
            to="/favorites"
            className={({ isActive }) =>
              `flex items-center gap-4 text-lg font-semibold hover:text-yellow-400 transition duration-200 ease-in-out ${
                isActive ? 'text-yellow-400' : 'text-gray-200'
              }`
            }
          >
            <CiStar className="text-2xl" />
            <span>Favorites</span>
          </NavLink>

          <NavLink
            to="/bin"
            className={({ isActive }) =>
              `flex items-center gap-4 text-lg font-semibold hover:text-yellow-400 transition duration-200 ease-in-out ${
                isActive ? 'text-yellow-400' : 'text-gray-200'
              }`
            }
          >
            <FaRegTrashAlt className="text-2xl" />
            <span>Bin</span>
          </NavLink>
        </div>

        {/* Settings Link */}
        <div className="mt-auto mb-6">
          <NavLink
            to="/settings"
            className={({ isActive }) =>
              `flex items-center gap-4 text-lg font-semibold hover:text-yellow-400 transition duration-200 ease-in-out ${
                isActive ? 'text-yellow-400' : 'text-gray-200'
              }`
            }
          >
            <CiSettings className="text-2xl" />
            <span>Settings</span>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
