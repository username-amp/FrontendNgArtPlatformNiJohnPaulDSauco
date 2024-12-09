import React from "react";
import { BsBell } from "react-icons/bs";

const NotificationButton = ({ toggleDropdown, notificationCount }) => {
  return (
    <button
      className="relative flex items-center justify-center h-16 w-16 text-black rounded-full"
      onClick={toggleDropdown}
    >
      <BsBell className="text-3xl font-extrabold" />
      {notificationCount > 0 && (
        <span className="absolute top-0 right-0 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
          {notificationCount}
        </span>
      )}
    </button>
  );
};

export default NotificationButton;
