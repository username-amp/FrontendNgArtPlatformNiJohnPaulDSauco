// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RootLayout from './shared/components/layouts/RootLayout';
import LandingLayout from './shared/components/layouts/LandingLayout';
import LandingPage from './pages/LandngPage';
import SignUpPage from './pages/SignUpPage';
import SignInPage from './pages/SignInPage';
import VerifyUserPage from './pages/VerifyUserPage';
import HomePage from './pages/HomePage';

const App = () => {
  return (
   
      <Routes>
        {/* Landing layout (no header) */}
        <Route path="/" element={<LandingLayout />}>
          <Route index element={<LandingPage />} />
        </Route>

        {/* Root layout with header */}
        <Route element={<RootLayout />}>
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/verify" element={<VerifyUserPage />} />
          <Route path="/home" element={<HomePage />} />
        </Route>
      </Routes>
  
  );
};

export default App;
