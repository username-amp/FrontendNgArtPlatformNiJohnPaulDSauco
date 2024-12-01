import React from 'react';
import { Link } from 'react-router-dom';

const SettingsSidebar = () => {
  return (
    <div className="w-64 bg-gray-800 text-white h-full p-4">
      <h2 className="text-lg font-semibold mb-4">Account Settings</h2>
      <ul className="space-y-3">
        <li>
          <Link to="/settings/edit-profile" className="hover:text-gray-400">Edit Profile</Link>
        </li>
        <li>
          <Link to="/settings/change-password" className="hover:text-gray-400">Change Password</Link>
        </li>
        <li>
          <Link to="/settings/account-violation" className="hover:text-gray-400">Account Violation</Link>
        </li>
      </ul>

      <div className="mt-8">
        <h2 className="text-lg font-semibold mb-4">More Options</h2>
        <ul className="space-y-3">
          <li>
            <Link to="/settings/terms-agreement" className="hover:text-gray-400">Terms and Agreement</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SettingsSidebar;
