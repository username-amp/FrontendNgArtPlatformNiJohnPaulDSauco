import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RootLayout from './shared/components/layouts/RootLayout';
import LandingLayout from './shared/components/layouts/LandingLayout';
import SettingsLayout from './shared/components/layouts/SettingsLayout';
import LandingPage from './pages/LandngPage';
import SignUpPage from './pages/SignUpPage';
import SignInPage from './pages/SignInPage';
import VerifyUserPage from './pages/VerifyUserPage';
import HomePage from './pages/HomePage';
import Favorites from './pages/Favorites';
import Gallery from './pages/Gallery';
import Bin from './pages/Bin';
import Settings from './pages/Settings';
import ChangePasswordPage from './pages/ChangePasswordPage';
import EditProfile from './components/EditProfile';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import RecoverPasswordPage from './pages/RecoverPasswordPage';
import PostPage from './components/PostPage';
import ProfilePage from './pages/ProfilePage';
import OthersProfilePage from './pages/OthersProfilePage';
import AccountViolation from './components/AccountViolation';
import TermsAndAgreement from './components/TermsAndAgreement';

const App = () => {
  return (
   
      <Routes>
        <Route path="/" element={<LandingLayout />}>
          <Route index element={<LandingPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/verify" element={<VerifyUserPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/recover-password" element={<RecoverPasswordPage />} />
         
        </Route>

        <Route element={<RootLayout />}>
          <Route path="/post/:postId" element={<PostPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/bin" element={<Bin />} />
          <Route path="/profile" element={<ProfilePage />} /> 
          <Route path="/profile/:authorId" element={<OthersProfilePage />} />

        </Route>

        <Route element={<SettingsLayout />}>
         
          <Route path="/settings/change-password" element={<ChangePasswordPage />} />
          <Route path="/settings/edit-profile" element={<EditProfile />} />
          <Route path="/settings/account-violation" element={<AccountViolation />} />
          <Route path="/settings/terms-agreement" element={<TermsAndAgreement />} />
        </Route>
      </Routes> 
  
  );
};

export default App;
