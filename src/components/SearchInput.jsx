import React from "react";
import { FaSearch } from "react-icons/fa";

const SearchInput = ({ searchQuery, onSearchChange, onSearchClick }) => {
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      onSearchClick();
    }
  };

  return (
    <div className="flex w-full h-16 bg-black text-white rounded-full overflow-hidden pl-3 flex-grow items-center border-2 border-black">
      <FaSearch className="text-white text-3xl mr-4" />
      <input
        type="text"
        placeholder="Search art styles, artist, etc."
        className="flex-grow px-4 py-4 text-black text-lg outline-none"
        value={searchQuery}
        onChange={onSearchChange}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
};

export default SearchInput;
