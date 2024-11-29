import React from 'react';
import CategoriesHome from '../components/CategoriesHome';
import CreatePostForm from '../components/CreatePostForm';
import ArtsHome from '../components/ArtsHome';

const HomePage = ({ isFormOpen, closeForm }) => {
  return (
    <div className="relative">
      {isFormOpen && <CreatePostForm closeForm={closeForm} />}
      <ArtsHome />
    </div>
  );
};

export default HomePage;

