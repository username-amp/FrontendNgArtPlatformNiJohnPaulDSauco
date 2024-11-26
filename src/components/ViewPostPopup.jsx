import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import io from "socket.io-client";

const socket = io("http://localhost:8002");

const ViewPostPopup = ({ post, isOpen, onClose }) => {
  const [isLiking, setIsLiking] = useState(false);
  const [isUnliking, setIsUnliking] = useState(false);
  const [error, setError] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(null);

  useEffect(() => {
    const initializeLikeStatus = () => {
      if (post && post.likes && Array.isArray(post.likes)) {
        const token = Cookies.get("token");
        if (token) {
          try {
            const decodedToken = jwtDecode(token);
            const userLiked = post.likes.some(
              (like) => like.user_id === decodedToken._id
            );

            const storedLikeStatus = localStorage.getItem(
              `liked-${decodedToken._id}-${post._id}`
            );
            if (storedLikeStatus !== null) {
              setIsLiked(JSON.parse(storedLikeStatus));
            } else {
              setIsLiked(userLiked);
            }
          } catch (error) {
            console.error("Error decoding token:", error.message);
          }
        }
      }
    };

    const fetchLikesCount = async () => {
      if (post?._id) {
        try {
          const response = await axios.get(
            `http://localhost:8002/api/v2/post/get-post/${post._id}`,
            {
              withCredentials: true,
              headers: { Authorization: `Bearer ${Cookies.get("token")}` },
            }
          );
          setLikesCount(response.data.likes_count);
        } catch (error) {
          console.error("Error fetching likes count:", error);
        }
      }
    };

    if (post) {
      initializeLikeStatus();
      fetchLikesCount();
    }

    const handlePostLiked = (data) => {
      if (data.postId === post._id) {
        setLikesCount(data.likes_count);
        if (data.user_id === Cookies.get("user_id")) {
          setIsLiked(data.is_liked);
        }
      }
    };

    socket.on("postLiked", handlePostLiked);

    return () => {
      socket.off("postLiked", handlePostLiked);
    };
  }, [post]);

  const handleLike = async () => {
    if (isLiking) return;
    setIsLiking(true);
    setError(null);

    try {
      const token = Cookies.get("token");
      const decodedToken = jwtDecode(token);
      const authorId = decodedToken._id;
      const recipientId = post.author_id?._id || post.author_id;

      const response = await axios.post(
        "http://localhost:8002/api/v2/interactions/like",
        { authorId, recipientId, postId: post._id },
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setLikesCount(response.data.likes_count);
      setIsLiked(true);

      localStorage.setItem(`liked-${decodedToken._id}-${post._id}`, JSON.stringify(true));
    } catch (err) {
      console.error("Error liking post:", err.response?.data || err.message);
      setError(err.response?.data?.message || "Failed to like the post.");
    } finally {
      setIsLiking(false);
    }
  };

  const handleUnlike = async () => {
    if (isUnliking) return;
    setIsUnliking(true);
    setError(null);

    try {
      const token = Cookies.get("token");
      const decodedToken = jwtDecode(token);
      const authorId = decodedToken._id;
      const recipientId = post.author_id?._id || post.author_id;

      const response = await axios.post(
        "http://localhost:8002/api/v2/interactions/unlike",
        { authorId, recipientId, postId: post._id },
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setLikesCount(response.data.likes_count);
      setIsLiked(false);

      localStorage.setItem(`liked-${decodedToken._id}-${post._id}`, JSON.stringify(false));
    } catch (err) {
      console.error("Error unliking post:", err.response?.data || err.message);
      setError(err.response?.data?.message || "Failed to unlike the post.");
    } finally {
      setIsUnliking(false);
    }
  };

  if (!post) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-3xl w-full relative shadow-lg overflow-hidden">
        <button className="absolute top-4 right-4 text-gray-600 hover:text-black" onClick={onClose}>
          ✕
        </button>
        <div className="text-center">
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">{post.title}</h2>
          <p className="text-gray-500 mb-3">{post.description}</p>
          <p className="text-gray-400 text-sm mb-5">
            Posted by: <span className="font-semibold">{post.author_id?.username}</span> on{" "}
            {new Date(post.createdAt).toLocaleString()}
          </p>
          <div className="flex justify-center gap-4 mt-5">
            {post.image_url.map((image, index) => (
              <img
                key={index}
                src={`http://localhost:8002${image}`}
                alt={post.title}
                className="w-32 h-32 object-cover rounded-lg shadow-md transition-transform transform hover:scale-105"
              />
            ))}
          </div>
          <div className="mt-5">
            <button
              onClick={isLiked ? handleUnlike : handleLike}
              className={`text-xl transition-all ${isLiked ? "text-red-500" : "text-gray-700"}`}
            >
              {isLiked ? "❤️ Liked" : "🤍 Like"} ({likesCount !== null ? likesCount : 0})
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewPostPopup;
