import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";

const SettingsSidebar = () => {
  const navigate = useNavigate();

  return (
    <div className="w-64 bg-white text-gray-800 h-full p-4 shadow-lg rounded-lg mt-10">
      {/* Back Button */}
      <div
        className="flex items-center mb-6 cursor-pointer text-gray-600 hover:text-gray-800"
        onClick={() => navigate("/home")}
      >
        <ArrowLeftIcon className="w-5 h-5 mr-2" />
        <span className="font-medium">Back to Home</span>
      </div>

      <h2 className="text-lg font-semibold mb-4 text-gray-700">
        Account Settings
      </h2>
      <ul className="space-y-3">
        <li>
          <Link
            to="/settings/edit-profile"
            className="text-gray-600 hover:text-gray-800 hover:underline"
          >
            Edit Profile
          </Link>
        </li>
        <li>
          <Link
            to="/settings/change-password"
            className="text-gray-600 hover:text-gray-800 hover:underline"
          >
            Change Password
          </Link>
        </li>
        <li>
          <Link
            to="/settings/account-violation"
            className="text-gray-600 hover:text-gray-800 hover:underline"
          >
            Account Violation
          </Link>
        </li>
      </ul>

      <div className="mt-8">
        <h2 className="text-lg font-semibold mb-4 text-gray-700">
          More Options
        </h2>
        <ul className="space-y-3">
          <li>
            <Link
              to="/settings/terms-agreement"
              className="text-gray-600 hover:text-gray-800 hover:underline"
            >
              Terms and Agreement
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SettingsSidebar;
