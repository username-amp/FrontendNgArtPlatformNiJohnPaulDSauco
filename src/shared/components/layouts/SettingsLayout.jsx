import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import SettingsSidebar from "../../../components/SettingsSidebar";
import { jwtDecode } from "jwt-decode";
import Header from "../partials/Header";

const SettingsLayout = () => {
  const navigate = useNavigate();

  const isTokenValid = () => {
    const token = document.cookie
      .split(";")
      .find((cookie) => cookie.trim().startsWith("token="));
    if (token) {
      const tokenValue = token.split("=")[1];
      try {
        jwtDecode(tokenValue);
        return true;
      } catch (error) {
        console.error("Invalid token:", error);
        return false;
      }
    }
    return false;
  };

  useEffect(() => {
    if (!isTokenValid()) {
      navigate("/signin");
    }
  }, [navigate]);

  return (
    <div>
      <Header />
      <div className="flex h-screen bg-gray-100">
        {/* Sidebar */}
        <SettingsSidebar />

        {/* Main Content */}
        <main className="flex-1 bg-white shadow-lg rounded-lg p-6 mt-10">
          <Outlet /> {/* This will render the child routes */}
        </main>
      </div>
    </div>
  );
};

export default SettingsLayout;
