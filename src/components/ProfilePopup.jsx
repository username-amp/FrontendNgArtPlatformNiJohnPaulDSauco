import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const ProfilePopup = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    profile_picture: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUserData({
          username: decoded.username || "User",
          email: decoded.email || "No Email",
          profile_picture: decoded.profile_picture || "",
        });
      } catch (error) {
        console.error("Invalid token:", error);
      }
    }
  }, []);

  const toggleProfile = () => setIsProfileOpen(!isProfileOpen);

  const handleLogout = () => {
    Cookies.remove("token");
    Cookies.remove("user_id");
    
    localStorage.removeItem("profilePromptClosed");

    navigate("/signin");
  };

  return (
    <div className="relative">
      <button
        className="bg-black text-white px-6 py-3 rounded-full text-lg font-extrabold hover:bg-gray-900 transition"
        onClick={toggleProfile}
      >
        Profile
      </button>

      {isProfileOpen && (
        <div className="absolute top-full left-0 bg-white shadow-lg rounded-lg p-2 w-72 z-50">
          <div className="flex items-center gap-4 mb-4 border-2 border-gray-200 rounded-lg p-2">
            {userData.profile_picture ? (
              <img
                src={userData.profile_picture}
                alt="Profile"
                className="w-12 h-12 rounded-full object-cover"
              />
            ) : (
              <div className="w-12 h-12 flex items-center justify-center bg-gray-300 text-xl font-bold rounded-full p-4">
                {userData.username[0]?.toUpperCase()}
              </div>
            )}
            <div>
              <p className="font-semibold">{userData.username}</p>
              <p className="text-sm text-gray-500">{userData.email}</p>
            </div>
          </div>
          <ul>
            <li
              className="py-2 px-4 hover:bg-gray-100 rounded-lg cursor-pointer"
              onClick={() => navigate("/profile")}
            >
              View Profile
            </li>
            <li
              className="py-2 px-4 hover:bg-gray-100 rounded-lg cursor-pointer"
              onClick={() => navigate("/settings/edit-profile")}
            >
              Settings
            </li>
            <li
              className="py-2 px-4 hover:bg-red-100 rounded-lg cursor-pointer text-red-500"
              onClick={handleLogout}
            >
              Logout
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default ProfilePopup;
