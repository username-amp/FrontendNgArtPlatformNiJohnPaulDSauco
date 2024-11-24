import React, { useEffect, useState } from "react";

const CategoriesHome = () => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const [shuffledCategories, setShuffledCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:8002/api/v2/category/", {
          method: "GET",
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.statusText || "Failed to fetch categories"}`);
        }

        const data = await response.json();
        setCategories(data);

  
        const shuffled = data.sort(() => 0.5 - Math.random()).slice(0, 4);
        setShuffledCategories(shuffled);
      } catch (err) {
        setError(err.message || "Failed to fetch categories");
      }
    };

    fetchCategories();
  }, []);

  return (
    <div>
      {error && <p className="text-red-500">Error: {error}</p>}
      <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
        {shuffledCategories.map((category) => (
          <button
            key={category._id}
            className="p-3 bg-gray-800 text-white rounded-md hover:bg-blue-600"
          >
            {category.title}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoriesHome;
