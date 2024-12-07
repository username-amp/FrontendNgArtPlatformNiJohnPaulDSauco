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
          throw new Error(
            `Error: ${response.statusText || "Failed to fetch categories"}`
          );
        }

        const data = await response.json();
        setCategories(data);

        const shuffled = data.sort(() => 0.5 - Math.random()).slice(0, 4);
        setShuffledCategories(shuffled);
      } catch (err) {
        setError(err.message || "Failed to fsetch categories");
      }
    };

    fetchCategories();
  }, []);

  return (
    <div>
      {error && <p className="text-red-500">{error}</p>}

      <div className="grid gap-6 grid-cols-2 md:grid-cols-4">
        {shuffledCategories.map((category) => (
          <button
            key={category._id}
            className="p-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl shadow-md hover:scale-105 transition-transform duration-300 ease-in-out"
          >
            <span className="text-lg font-semibold">{category.title}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoriesHome;
