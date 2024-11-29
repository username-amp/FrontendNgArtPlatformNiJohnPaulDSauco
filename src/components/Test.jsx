import React from 'react';

const Header = () => {
  return (
    <div className="flex flex-col w-full bg-gray-100 min-h-screen p-6">
      {/* Top Section */}
      <div className="flex justify-center items-center w-full bg-white shadow-md p-4 rounded-lg gap-8">
        <button className="bg-blue-600 text-white px-6 py-3 rounded-md text-lg hover:bg-blue-700 transition">
          Create
        </button>
        <div className="flex flex-col items-center mx-4">
          <img
            src="https://via.placeholder.com/60"
            alt="logo"
            className="w-16 h-16 rounded-full mb-2"
          />
          <h1 className="text-xl font-bold text-gray-800">Home for Artists</h1>
        </div>
        <button className="bg-gray-800 text-white px-6 py-3 rounded-md text-lg hover:bg-gray-900 transition">
          Profile
        </button>
      </div>

      {/* Middle Section */}
      <div className="flex items-center w-full bg-gray-50 mt-6 p-4 rounded-lg shadow-md gap-4">
        {/* Bell Icon */}
        <div className="flex items-center text-gray-500 text-2xl">
          🔔
        </div>

        {/* Search Input */}
        <div className="flex bg-gray-200 rounded-md px-4 py-3 flex-grow">
          <span className="text-gray-500 text-xl">🔍</span>
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent outline-none ml-2 text-gray-700 text-lg w-full"
          />
        </div>

        {/* Categories */}
        <div className="flex gap-3">
          <button className="bg-purple-600 text-white px-5 py-3 rounded-md text-sm md:text-lg hover:bg-purple-700 transition">
            Categories
          </button>
          <button className="bg-purple-600 text-white px-5 py-3 rounded-md text-sm md:text-lg hover:bg-purple-700 transition">
            Categories
          </button>
          <button className="bg-purple-600 text-white px-5 py-3 rounded-md text-sm md:text-lg hover:bg-purple-700 transition">
            Categories
          </button>
          <button className="bg-purple-600 text-white px-5 py-3 rounded-md text-sm md:text-lg hover:bg-purple-700 transition">
            Categories
          </button>
          <button className="bg-purple-600 text-white px-5 py-3 rounded-md text-sm md:text-lg hover:bg-purple-700 transition">
            Categories
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
