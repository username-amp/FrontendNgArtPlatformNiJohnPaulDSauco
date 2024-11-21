import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../partials/Header';
import Sidebar from '../partials/Sidebar';

const RootLayout = () => {
  return (
    <div className="flex h-screen bg-gray-900">
      <aside className="w-28 bg-transparent md:w-56 border-r-2 border-s-white">
        <Sidebar />
      </aside>

      <div className="flex-1 flex flex-col">
        <header className="bg-transparent text-white">
          <Header />
        </header>

        <main className="flex-1 bg-white p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default RootLayout;
