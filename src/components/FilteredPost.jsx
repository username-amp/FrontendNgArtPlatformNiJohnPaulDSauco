import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../shared/components/partials/Header";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

const FilteredPost = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const searchQuery = new URLSearchParams(location.search).get("query");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:8002/api/v2/post/get-post`,
          {
            withCredentials: true,
            params: { search: searchQuery },
          }
        );
        setPosts(response.data);
      } catch (err) {
        setError("Failed to load posts.");
      } finally {
        setLoading(false);
      }
    };

    if (searchQuery) {
      fetchPosts();
    }
  }, [searchQuery]);

  const handlePostClick = (postId) => {
    navigate(`/post/${postId}`);
  };

  return (
    <div>
      <Header />
      {/* Back Button */}
      <button
        className="text-gray-600 hover:text-black z-10 ml-10"
        onClick={() => navigate("/home")}
      >
        Back to Home
        <ArrowLeftIcon className="w-10 h-10" />
      </button>

      <div className="columns-2 sm:columns-3 lg:columns-7 gap-0 px-4 mt-12">
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

export default FilteredPost;
