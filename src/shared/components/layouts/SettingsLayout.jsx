import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import SettingsSidebar from "../../../components/SettingsSidebar";
import { jwtDecode } from "jwt-decode";

const SettingsLayout = () => {
  const navigate = useNavigate();

  const isTokenValid = () => {
    const token = document.cookie
      .split(";")
      .find((cookie) => cookie.trim().startsWith("token="));
    if (token) {
      const tokenValue = token.split("=")[1];
      try {
        jwtDecode(tokenValue); // Attempt to decode the token
        return true; // Token is valid
      } catch (error) {
        console.error("Invalid token:", error);
        return false;
      }
    }
    return false; // No token found
  };

  useEffect(() => {
    if (!isTokenValid()) {
      navigate("/signin"); // Redirect to sign-in if token is invalid or missing
    }
  }, [navigate]);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <SettingsSidebar />

      {/* Main Content */}
      <main className="flex-1 bg-white shadow-lg rounded-lg p-6">
        <Outlet /> {/* This will render the child routes */}
      </main>
    </div>
  );
};

export default SettingsLayout;
