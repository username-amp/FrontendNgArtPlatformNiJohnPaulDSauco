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
      className={`fixed top-0 left-0 h-full bg-gray-900 text-white shadow-lg transition-transform transform ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } md:translate-x-0 w-64`}
    >
      <div className="p-4 flex flex-col h-full">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-bold">MUZEUM</h1>
          <button className="text-xl md:hidden" onClick={closeSidebar}>
            ✖
          </button>
        </div>

        <div className="flex flex-col gap-6 flex-grow">
          <button
            className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-blue-600 mt-4"
            onClick={openCreateForm}
          >
            Create
          </button>
          <NavLink
            to="/home"
            className={({ isActive }) =>
              `flex items-center gap-3 text-base font-medium hover:text-red-400 ${
                isActive ? 'text-red-400' : ''
              }`
            }
          >
            <GoHome /> <span>Home</span>
          </NavLink>
          <NavLink
            to="/gallery"
            className={({ isActive }) =>
              `flex items-center gap-3 text-base font-medium hover:text-red-400 ${
                isActive ? 'text-red-400' : ''
              }`
            }
          >
            <GrGallery /> <span>Gallery</span>
          </NavLink>
          <NavLink
            to="/favorites"
            className={({ isActive }) =>
              `flex items-center gap-3 text-base font-medium hover:text-red-400 ${
                isActive ? 'text-red-400' : ''
              }`
            }
          >
            <CiStar /> <span>Favorites</span>
          </NavLink>
          <NavLink
            to="/bin"
            className={({ isActive }) =>
              `flex items-center gap-3 text-base font-medium hover:text-red-400 ${
                isActive ? 'text-red-400' : ''
              }`
            }
          >
            <FaRegTrashAlt /> <span>Bin</span>
          </NavLink>
        </div>

        <div className="mt-auto">
          <NavLink
            to="/settings"
            className={({ isActive }) =>
              `flex items-center gap-3 text-base font-medium hover:text-red-400 ${
                isActive ? 'text-red-400' : ''
              }`
            }
          >
            <CiSettings /> <span>Settings</span>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
