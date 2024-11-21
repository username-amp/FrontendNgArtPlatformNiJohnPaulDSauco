
import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../partials/Header';

const RootLayout = () => {
  return (
    <div>
      <header>{<Header />}</header>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default RootLayout;
