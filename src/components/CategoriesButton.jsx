import React from "react";

const CategoriesButtons = ({ categories, error, onCategoryClick }) => {
  return (
    <div className="flex gap-2 overflow-x-auto sm:overflow-visible">
      {error && <p className="text-red-500">{error}</p>}
      {categories.slice(0, 5).map((category) => (
        <button
          key={category._id}
          onClick={() => onCategoryClick(category.title)}
          className="flex items-center justify-center h-16 px-6 bg-black text-white font-bold rounded-lg shadow-md hover:scale-105 transition-transform duration-300 ease-in-out whitespace-nowrap"
        >
          {category.title}
        </button>
      ))}
    </div>
  );
};

export default CategoriesButtons;
