import React from 'react';
import { Outlet } from 'react-router-dom';
import SettingsSidebar from '../../../components/SettingsSidebar';

const SettingsLayout = () => {
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
