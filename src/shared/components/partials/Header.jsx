import React, { useState, useEffect } from "react";
import CreatePostForm from "../../../components/CreatePostForm";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { formatDistanceToNow } from "date-fns";
import ProfilePopup from "../../../components/ProfilePopup";
import axios from "axios";
import SearchInput from "../../../components/SearchInput";
import CategoriesButtons from "../../../components/CategoriesButton";
import NotificationButton from "../../../components/NotificationButton"; // Import the new component

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [user, setUser] = useState({
    username: "",
    firstName: "",
    profile_Picture: null,
  });
  const navigate = useNavigate();

  const handleCategoryClick = (categoryTitle) => {
    navigate(`/filtered-post?query=${categoryTitle}`);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchClick = () => {
    console.log("Search initiated");

    if (searchQuery) {
      navigate(`/filtered-post?query=${searchQuery}`);
    }
  };

  const openForm = () => setIsFormVisible(true);
  const closeForm = () => setIsFormVisible(false);

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

  const fetchUserData = async () => {
    const token = Cookies.get("token");
    if (!token) return;

    try {
      const decodedToken = jwtDecode(token);

      const response = await axios.get(
        "http://localhost:8002/api/v2/auth/profile",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        const { user } = response.data;
        setUser({
          username: user.username || "User",
          firstName: user.firstName || "User",
          profilePicture: user.profilePicture || null,
        });
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchUserData();
  }, []);

  return (
    <div className="flex flex-col w-full bg-white">
      {/* Top Section */}
      <div className="relative flex justify-center items-center w-full bg-white p-6 rounded-lg">
        {/* Logged-in User Greeting */}
        <div className="absolute left-6 text-md font-bold text-white whitespace-nowrap bg-black p-3 rounded-full">
          Hi, {user.username}!
        </div>
        <div className="flex justify-center items-center w-full bg-white rounded-lg gap-8">
          <button
            className="text-black bg-white px-6 py-3 rounded-full border-2 border-black text-lg font-extrabold hover:bg-blue-700 hover:text-white transition"
            onClick={openForm}
          >
            Create
          </button>
          <div className="flex flex-col items-center w-fit h-fit">
            <div className="w-32 sm:w-40 md:w-80 h-32 flex items-center justify-center rounded-full">
              <img
                src="/src/assets/images/museo.png"
                alt="logo"
                className="w-[100%]"
              />
            </div>
          </div>
          <ProfilePopup
            username={user.username}
            firstName={user.firstName}
            profilePicture={user.profilePicture}
          />
          {isFormVisible && <CreatePostForm closeForm={closeForm} />}
        </div>
      </div>

      {/* Middle Section */}
      <div className="flex flex-col sm:flex-row items-center w-full bg-gray-50 p-6 rounded-lg gap-6">
        <NotificationButton toggleDropdown={toggleDropdown} />{" "}
        {/* Notification Button */}
        {isDropdownOpen && (
          <div className="absolute top-72 left-0 bg-white shadow-lg rounded-lg p-4 w-72 z-50 max-h-96 overflow-y-auto">
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
        <SearchInput
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
          onSearchClick={handleSearchClick}
        />
        <CategoriesButtons
          categories={categories}
          error={error}
          onCategoryClick={handleCategoryClick}
        />
      </div>
    </div>
  );
};

export default Header;
