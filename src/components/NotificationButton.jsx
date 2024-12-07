import React from "react";
import { BsBell } from "react-icons/bs";

const NotificationButton = ({ toggleDropdown }) => {
  return (
    <button
      className="relative flex items-center justify-center h-16 w-16 text-black rounded-full"
      onClick={toggleDropdown}
    >
      <BsBell className="text-3xl font-extrabold" />
    </button>
  );
};

export default NotificationButton;
