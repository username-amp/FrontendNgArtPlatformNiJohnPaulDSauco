import React from 'react';
import { Outlet } from 'react-router-dom';

const LandingLayout = () => {
  return (
    <div>

      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default LandingLayout;
