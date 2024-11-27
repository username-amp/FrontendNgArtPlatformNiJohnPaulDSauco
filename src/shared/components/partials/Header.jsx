import React, { useState, useEffect } from 'react';
import { FaSearch, FaAngleDown } from 'react-icons/fa';
import { BsBell } from 'react-icons/bs';
import { MdOutlineMenu } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { formatDistanceToNow } from 'date-fns'; // Import from date-fns

const Header = ({ toggleSidebar }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    Cookies.remove("token");
    Cookies.remove("user_id");
    console.log('User logged out');
    navigate('/signin');
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);

    if (!isDropdownOpen) {
      fetchNotifications();
    }
  };

  const fetchNotifications = async () => {
    const token = Cookies.get("token");

    if (!token) {
      console.log('User not logged in');
      return;
    }

    const decodedToken = jwtDecode(token);
    const userId = decodedToken._id;

    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:8002/api/v2/notifications/${userId}`, {
        withCredentials: true,
      });
      setNotifications(response.data.notifications || []);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    } finally {
      setLoading(false);
    }
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
          <button className="notifBtn" onClick={toggleDropdown}>
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
            <div className="absolute top-12 right-4 bg-gray-800 text-white p-3 rounded-lg shadow-lg z-50 w-72">
              <button
                className="block text-sm px-4 py-2 hover:bg-gray-700 rounded"
                onClick={handleLogout}
              >
                Logout
              </button>
              <div className="mt-2">
                <h3 className="text-lg font-medium">Notifications</h3>
                {loading ? (
                  <p className="text-sm">Loading notifications...</p>
                ) : notifications.length > 0 ? (
                  <ul className="text-sm mt-2">
                    {notifications.map((notif) => (
                      <li key={notif._id} className="p-2 hover:bg-gray-700 rounded">
                        <p>{`${notif.author?.username || "Unknown"} ${notif.message}`}</p>
                        <p className="text-xs text-gray-400">
                          {formatDistanceToNow(new Date(notif.createdAt), { addSuffix: true })}
                        </p>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm mt-2">No new notifications</p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
