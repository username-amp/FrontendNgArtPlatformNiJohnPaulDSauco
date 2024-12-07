import React from "react";
import axiosInstance from "../utils/axiosInstance";
import CategoriesHome from "../components/CategoriesHome";
import CreatePostForm from "../components/CreatePostForm";
import ArtsHome from "../components/ArtsHome";
import { useNavigate } from "react-router-dom";
const HomePage = ({ isFormOpen, closeForm }) => {
  const navigate = useNavigate();

  return (
    <div className="relative">
      {isFormOpen && <CreatePostForm closeForm={closeForm} />}
      <ArtsHome />
    </div>
  );
};

export default HomePage;
