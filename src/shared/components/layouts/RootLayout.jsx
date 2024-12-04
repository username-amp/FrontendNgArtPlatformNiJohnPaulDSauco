import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Header from '../partials/Header';
import Sidebar from '../partials/Sidebar';
import CreatePostForm from '../../../components/CreatePostForm';
import axiosInstance from '../../../utils/axiosInstance';
import{ jwtDecode } from 'jwt-decode';

const RootLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCreateFormOpen, setIsCreateFormOpen] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [warningMessage, setWarningMessage] = useState('');
  const [userId, setUserId] = useState(null);
  const [violations, setViolations] = useState(null);
  const navigate = useNavigate();

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);

  const toggleCreateForm = () => setIsCreateFormOpen(!isCreateFormOpen);
  const closeCreateForm = () => setIsCreateFormOpen(false);

  const getUserIdFromToken = () => {
    const token = document.cookie
      .split(';')
      .find((cookie) => cookie.trim().startsWith('token='));
    if (token) {
      const tokenValue = token.split('=')[1];
      try {
        const decodedToken = jwtDecode(tokenValue);
        return decodedToken._id;
      } catch (error) {
        console.error('Error decoding token:', error);
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
      // Redirect to sign-in page if no token is present or invalid
      navigate('/signin');
    }
  }, [navigate]);

  useEffect(() => {
    if (userId) {
      const fetchUserViolations = async () => {
        try {
          const response = await axiosInstance.get(`/users/${userId}/violations`);
          const userViolations = response.data.violations;
          setViolations(userViolations);

          if (userViolations === 1) {
            setWarningMessage(
              'You have 1 violation. Please adhere to the community guidelines.'
            );
            setShowWarning(true);
          }

          if (userViolations === 2) {
            setWarningMessage(
              'You have 2 violations. Further violations may result in a ban.'
            );
            setShowWarning(true);
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      };

      fetchUserViolations();
    }
  }, [userId]);

  return (
    <div className="flex h-screen bg-white">
      <div className="flex-1 flex flex-col w-full">
        <header>
          <Header toggleSidebar={toggleSidebar} />
        </header>

        <main className="flex-1 bg-white w-full relative">
          <Outlet />

          {/* Warning popup */}
          {showWarning && (
            <div className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-gray-600 bg-opacity-50 z-50">
              <div className="bg-white p-6 rounded shadow-lg">
                <h3 className="text-xl font-bold">Warning!</h3>
                <p className="mt-2">{warningMessage}</p>
                <button
                  className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
                  onClick={() => setShowWarning(false)}
                >
                  Close
                </button>
              </div>
            </div>
          )}

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
