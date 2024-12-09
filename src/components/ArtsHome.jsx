import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import socketIOClient from "socket.io-client";
import { FiFilter } from "react-icons/fi";
import Header from "../shared/components/partials/Header";
import axiosInstance from "../utils/axiosInstance";

const ArtsHome = () => {
  const [posts, setPosts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [filterVisible, setFilterVisible] = useState(false);
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("recent");
  const navigate = useNavigate();

  const fetchPosts = async () => {
    try {
      const response = await axiosInstance.get("/post/get-post/", {
        params: {
          category: selectedCategory || "",
          search: search || "",
          filter: filterType,
        },
      });

      let sortedPosts = response.data;

      if (filterType === "recent") {
        sortedPosts = sortedPosts.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
      } else if (filterType === "popular") {
        sortedPosts = sortedPosts.sort((a, b) => b.likes - a.likes);
      }

      setPosts(sortedPosts);
    } catch (error) {
      console.error("Failed to fetch posts", error);
    }
  };

  const checkAndDeleteCategory = async () => {
    try {
      const categoriesResponse = await axiosInstance.get("/category/");
      const categories = categoriesResponse.data;

      for (const category of categories) {
        const response = await axiosInstance.get("/post/check-category", {
          params: { categoryTitle: category.title },
        });

        if (!response.data.exists) {
          await axiosInstance.post("/category/deleteCategory", {
            categoryTitle: category.title,
          });
          console.log(`Deleted unused category: ${category.title}`);
        }
      }
    } catch (error) {
      console.error("Failed to check and delete categories", error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [selectedCategory, search, filterType]);

  useEffect(() => {
    const socket = socketIOClient("http://localhost:8002", {
      withCredentials: true,
    });

    socket.on("connect", () => {
      console.log("Connected to the socket server");
    });

    socket.on("newPost", (newPost) => {
   
      setPosts((prevPosts) => [newPost, ...prevPosts]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    checkAndDeleteCategory();
  }, []);

  const handlePostClick = (postId) => {
    navigate(`/post/${postId}`);
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleFilterTypeChange = (e) => {
    setFilterType(e.target.value);
  };

  const toggleFilterVisibility = () => {
    setFilterVisible(!filterVisible); // Toggle filter visibility
  };

  const closeFilter = () => {
    setFilterVisible(false); // Close the filter panel
  };

  return (
    <div>
      <Header />
      <div className="relative">
        <FiFilter
          className="absolute top-0 right-0 m-4 text-xl cursor-pointer transition-transform transform hover:scale-110 hover:text-blue-500"
          onClick={toggleFilterVisibility} // Toggle filter visibility on click
        />
        {filterVisible && (
          <div className="absolute top-0 right-0 m-4 bg-white shadow-lg p-4 rounded-lg z-10 transition-transform transform hover:scale-105">
            <button
              onClick={closeFilter} // Close button functionality
              className="absolute top-2 right-2 text-xl text-gray-600 hover:text-black"
            >
              &times;
            </button>
            <input
              type="text"
              value={search}
              onChange={handleSearchChange}
              placeholder="Search..."
              className="border p-2 rounded-lg mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out"
            />
            <div className="mb-2">
              <label className="mr-2">Filter by:</label>
              <select
                value={filterType}
                onChange={handleFilterTypeChange}
                className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out"
              >
                <option value="recent">Recent</option>
                <option value="popular">Popular</option>
              </select>
            </div>
            <button
              className="bg-blue-500 text-white p-2 rounded-lg transition-all duration-300 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
              onClick={fetchPosts}
            >
              Apply Filter
            </button>
          </div>
        )}
      </div>

      <div className="columns-2 sm:columns-3 lg:columns-7 gap-0 px-4 mt-10">
        {posts.map((post) => (
          <div
            key={post._id}
            className="relative p-1 bg-white shadow-md rounded-lg cursor-pointer overflow-hidden group"
            onClick={() => handlePostClick(post._id)}
          >
            {post.image_url?.length > 0 && (
              <img
                src={`http://localhost:8002${post.image_url[0]}`}
                alt={post.title}
                className="w-full rounded-md object-contain group-hover:opacity-30 transition-opacity duration-300"
              />
            )}
            <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-40">
              <div className="w-16 h-16 bg-gray-200 flex items-center justify-center rounded-full text-xl font-bold text-black mb-2">
                {post.author_id?.username?.charAt(0)?.toUpperCase() ||
                  post.author_id?.firstname?.charAt(0)?.toUpperCase() ||
                  "?"}
              </div>
              <span className="text-white text-xl font-semibold">
                {post.author_id?.username ||
                  post.author_id?.firstname ||
                  "Unknown"}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArtsHome;
