import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RootLayout from './shared/components/layouts/RootLayout';
import LandingLayout from './shared/components/layouts/LandingLayout';
import LandingPage from './pages/LandngPage';
import SignUpPage from './pages/SignUpPage';
import SignInPage from './pages/SignInPage';
import VerifyUserPage from './pages/VerifyUserPage';
import HomePage from './pages/HomePage';
import Favorites from './pages/Favorites';
import Gallery from './pages/Gallery';
import Bin from './pages/Bin';
import Settings from './pages/Settings';

const App = () => {
  return (
   
      <Routes>
        <Route path="/" element={<LandingLayout />}>
          <Route index element={<LandingPage />} />
        </Route>

        <Route element={<RootLayout />}>
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/verify" element={<VerifyUserPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/bin" element={<Bin />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
      </Routes>
  
  );
};

export default App;
