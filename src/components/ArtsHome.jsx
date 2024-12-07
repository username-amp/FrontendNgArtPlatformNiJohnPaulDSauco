import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import socketIOClient from "socket.io-client";
import Header from "../shared/components/partials/Header";
import axiosInstance from "../utils/axiosInstance";

const ArtsHome = () => {
  const [posts, setPosts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const navigate = useNavigate();

  const fetchPosts = async (category) => {
    try {
      const response = await axiosInstance.get(`/post/get-post/`, {
        params: {
          category: category || "",
        },
      });
      setPosts(response.data);
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
    fetchPosts(selectedCategory);
  }, [selectedCategory]);

  useEffect(() => {
    const socket = socketIOClient("http://localhost:8002", {
      withCredentials: true,
    });

    socket.on("connect", () => {
      console.log("Connected to the socket server");
    });

    socket.on("newPost", (newPost) => {
      console.log("New post received:", newPost);
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

  return (
    <div>
      <Header />
      <div className="columns-2 sm:columns-3 lg:columns-7 gap-0 px-4">
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
