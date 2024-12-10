import React, { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import CreatePostForm from "../../../components/CreatePostForm";
import axiosInstance from "../../../utils/axiosInstance";
import { jwtDecode } from "jwt-decode";

const RootLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCreateFormOpen, setIsCreateFormOpen] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [warningMessage, setWarningMessage] = useState("");
  const [userId, setUserId] = useState(null);
  const [violations, setViolations] = useState(null);
  const navigate = useNavigate();

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);

  const toggleCreateForm = () => setIsCreateFormOpen(!isCreateFormOpen);
  const closeCreateForm = () => setIsCreateFormOpen(false);

  const getUserIdFromToken = () => {
    const token = document.cookie
      .split(";")
      .find((cookie) => cookie.trim().startsWith("token="));
    if (token) {
      const tokenValue = token.split("=")[1];
      try {
        const decodedToken = jwtDecode(tokenValue);
        return decodedToken._id;
      } catch (error) {
        console.error("Error decoding token:", error);
        return null;
      }
    }
    return null;
  };

  useEffect(() => {
    const userIdFromToken = getUserIdFromToken();
    if (userIdFromToken) {
      setUserId(userIdFromToken);
    } else {
      navigate("/signin");
    }
  }, [navigate]);

  

  return (
    <div className="flex h-screen bg-white">
      <div className="flex-1 flex flex-col w-full">
        <main className="flex-1 bg-white w-full relative">
          <Outlet />

          {/* Warning popup */}
       

          {/* Show Create Post Form */}
          {isCreateFormOpen && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
              <CreatePostForm closeForm={closeCreateForm} />
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default RootLayout;
