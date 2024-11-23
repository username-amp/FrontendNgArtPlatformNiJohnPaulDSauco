import React from 'react';
import CategoriesHome from '../components/CategoriesHome';
import CreatePostForm from '../components/CreatePostForm';

const HomePage = ({ isFormOpen, closeForm }) => {
  return (
    <div className="relative">
      <CategoriesHome />
      {isFormOpen && <CreatePostForm closeForm={closeForm} />}
    </div>
  );
};

export default HomePage;

