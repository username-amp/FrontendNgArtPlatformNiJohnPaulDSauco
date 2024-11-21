// src/shared/components/layouts/LandingLayout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';

const LandingLayout = () => {
  return (
    <div>
      {/* Your layout structure without Router */}
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default LandingLayout;
