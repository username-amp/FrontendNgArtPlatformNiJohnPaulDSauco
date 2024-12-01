import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../partials/Header';
import Sidebar from '../partials/Sidebar';
import CreatePostForm from '../../../components/CreatePostForm';

const RootLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCreateFormOpen, setIsCreateFormOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);

  const toggleCreateForm = () => setIsCreateFormOpen(!isCreateFormOpen);
  const closeCreateForm = () => setIsCreateFormOpen(false);

  return (
    <div className="flex h-screen bg-white">
      <div className="flex-1 flex flex-col w-full ">
        <header>
          
          <Header toggleSidebar={toggleSidebar} />
        </header>

        <main className="flex-1 bg-white  w-full relative">
          <Outlet />
       
          {isCreateFormOpen && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
              <CreatePostForm closeForm={closeCreateForm} />
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default RootLayout;
