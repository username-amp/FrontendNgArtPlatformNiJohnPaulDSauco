import React, { useState } from 'react';
import { GoHome } from "react-icons/go";
import { GrGallery } from "react-icons/gr";
import { CiStar, CiSettings } from "react-icons/ci";
import { FaRegTrashAlt } from "react-icons/fa";
import { LiaPaintBrushSolid } from "react-icons/lia";
import { MdOutlineMenu } from "react-icons/md";
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`fixed top-0 left-0 h-full bg-transparent text-white shadow-lg transition-all ${isOpen ? 'w-28' : 'w-16'} md:w-56`}>
      <div className="flex flex-col justify-between h-full p-4">
        <div className="flex flex-col items-start mb-6">
          <div className="md:hidden">
            <img src="/path-to-your-logo.svg" alt="Logo" className="w-10 h-10" />
          </div>
          <h1 className="text-xl font-bold text-white hidden md:block">
            MUZEUM
          </h1>
        </div>

        <div className="flex flex-col gap-8 items-start">
          <div className="md:hidden">
            <button onClick={toggleSidebar}>
              <MdOutlineMenu className="text-2xl cursor-pointer hover:text-gray-400" />
            </button>
          </div>

          <button className="flex items-center gap-2 w-full bg-red-600 text-base font-semibold py-2 px-3 rounded-lg hover:bg-red-500 transition justify-start">
            <LiaPaintBrushSolid className="text-xl" />
            <span className={`${isOpen ? 'block' : 'hidden'} md:block`}>Create</span>
          </button>

          <div className="flex flex-col gap-4 items-start">
            <NavLink
              to="/home"
              className={({ isActive }) =>
                `flex items-center gap-3 text-base font-medium hover:text-red-400 transition ${isActive ? 'text-red-400' : ''}`
              }
            >
              <GoHome className="text-lg" />
              <span className={`${isOpen ? 'block' : 'hidden'} md:block`}>Home</span>
            </NavLink>
            <NavLink
              to="/gallery"
              className={({ isActive }) =>
                `flex items-center gap-3 text-base font-medium hover:text-red-400 transition ${isActive ? 'text-red-400' : ''}`
              }
            >
              <GrGallery className="text-lg" />
              <span className={`${isOpen ? 'block' : 'hidden'} md:block`}>Gallery</span>
            </NavLink>
            <NavLink
              to="/favorites"
              className={({ isActive }) =>
                `flex items-center gap-3 text-base font-medium hover:text-red-400 transition ${isActive ? 'text-red-400' : ''}`
              }
            >
              <CiStar className="text-lg" />
              <span className={`${isOpen ? 'block' : 'hidden'} md:block`}>Favorites</span>
            </NavLink>
            <NavLink
              to="/bin"
              className={({ isActive }) =>
                `flex items-center gap-3 text-base font-medium hover:text-red-400 transition ${isActive ? 'text-red-400' : ''}`
              }
            >
              <FaRegTrashAlt className="text-lg" />
              <span className={`${isOpen ? 'block' : 'hidden'} md:block`}>Bin</span>
            </NavLink>
          </div>
        </div>

        <div className="mt-auto flex justify-start">
          <NavLink
            to="/settings"
            className={({ isActive }) =>
              `flex items-center gap-3 text-base font-medium hover:text-red-400 transition ${isActive ? 'text-red-400' : ''}`
            }
          >
            <CiSettings className="text-lg" />
            <span className={`${isOpen ? 'block' : 'hidden'} md:block`}>Settings</span>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
