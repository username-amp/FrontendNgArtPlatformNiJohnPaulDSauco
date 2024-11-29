import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { BsBell } from "react-icons/bs";
import { MdOutlineMenu } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { formatDistanceToNow } from "date-fns";

const Header = ({ toggleSidebar }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    Cookies.remove("token");
    Cookies.remove("user_id");
    navigate("/signin");
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
    if (!isDropdownOpen) fetchNotifications();
  };

  const fetchNotifications = async () => {
    const token = Cookies.get("token");
    if (!token) return;

    const decodedToken = jwtDecode(token);
    const userId = decodedToken._id;

    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:8002/api/v2/notifications/${userId}`,
        { withCredentials: true }
      );
      setNotifications(response.data.notifications || []);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch("http://localhost:8002/api/v2/category/", {
        method: "GET",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(
          `Error: ${response.statusText || "Failed to fetch categories"}`
        );
      }

      const data = await response.json();
      const shuffled = data.sort(() => 0.5 - Math.random()).slice(0, 5);
      setCategories(shuffled);
    } catch (err) {
      setError(err.message || "Failed to fetch categories");
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="flex flex-col w-full bg-white">
      {/* Top Section */}
      <div className="flex justify-center items-center w-full bg-white rounded-lg gap-8">
        <button
          className="text-black bg-white px-6 py-3 rounded-full border-2 border-black text-lg font-extrabold hover:bg-blue-700 hover:text-white transition"
          onClick={toggleSidebar}
        >
          Create
        </button>
        <div className="flex flex-col items-center w-fit h-fit">
          <div className="w-32 sm:w-40 md:w-48 h-32 flex items-center justify-center rounded-full">
            <img
              src="/src/assets/images/MUZEUMlogo.png"
              alt="logo"
              className="w-[100%]"
            />
          </div>
        </div>
        <button
          className="bg-black text-white px-6 py-3 rounded-full text-lg font-extrabold hover:bg-gray-900 transition"
          onClick={handleLogout}
        >
          Profile
        </button>
      </div>

      {/* Middle Section */}
      <div className="flex flex-col sm:flex-row items-center w-full bg-gray-50 p-6 rounded-lg gap-6">
        {/* Enlarged Notifications Icon */}
        <button
  className="relative flex items-center justify-center h-16 w-16 text-black rounded-full"
  onClick={toggleDropdown}
>
  <BsBell className="text-3xl" /> {/* Enlarged icon size */}
  {isDropdownOpen && (
    <div className="absolute top-16 left-0 bg-white shadow-lg rounded-lg p-4 w-72 z-50 max-h-96 overflow-y-auto">
      <h3 className="font-semibold text-lg mb-2">Notifications</h3>
      {loading ? (
        <p>Loading...</p>
      ) : notifications.length > 0 ? (
        notifications.map((notif) => (
          <div key={notif._id} className="py-2 border-b">
            <p>{notif.message}</p>
            <p className="text-sm text-gray-500">
              {formatDistanceToNow(new Date(notif.createdAt), {
                addSuffix: true,
              })}
            </p>
          </div>
        ))
      ) : (
        <p>No new notifications</p>
      )}
    </div>
  )}
</button>



        {/* Enlarged Search Bar */}
        <div className="flex w-full h-16 bg-black text-white rounded-full overflow-hidden pl-3 flex-grow items-center border-2 border-black">
          <FaSearch className="text-white text-3xl mr-4" /> {/* Enlarged icon size */}
          <input
            type="text"
            placeholder="Search art styles, artist, etc."
            className="flex-grow px-4 py-4 text-black text-lg outline-none"
          />
        </div>

        {/* Enlarged Categories */}
        <div className="flex gap-2 overflow-x-auto sm:overflow-visible">
          {error && <p className="text-red-500">{error}</p>}
          {categories.slice(0, 5).map((category) => (
            <button
              key={category._id}
              className="flex items-center justify-center h-16 px-6 bg-gray-600 text-white font-bold rounded-lg shadow-md hover:scale-105 transition-transform duration-300 ease-in-out whitespace-nowrap"
            >
              {category.title}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Header;
