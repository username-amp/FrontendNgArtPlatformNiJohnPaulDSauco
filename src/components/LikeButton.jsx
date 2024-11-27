import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

const LikeButton = ({ postId, postLikes, authorId }) => {
  const [isLiking, setIsLiking] = useState(false);
  const [isUnliking, setIsUnliking] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(postLikes?.length || 0);
  const [error, setError] = useState(null);

  useEffect(() => {
    const initializeLikeStatus = () => {
      const token = Cookies.get("token");
      if (token) {
        try {
          const decodedToken = jwtDecode(token);
          const userLiked = postLikes.some((like) => like.user_id === decodedToken._id);
          const storedLikeStatus = localStorage.getItem(
            `liked-${decodedToken._id}-${postId}`
          );

          setIsLiked(storedLikeStatus !== null ? JSON.parse(storedLikeStatus) : userLiked);
        } catch (err) {
          console.error("Error decoding token:", err.message);
        }
      }
    };

    initializeLikeStatus();
  }, [postLikes, postId]);

  const handleLike = async () => {
    if (isLiking) return;
    setIsLiking(true);
    setError(null);

    try {
      const token = Cookies.get("token");
      const decodedToken = jwtDecode(token);
      const response = await axios.post(
        "http://localhost:8002/api/v2/interactions/like",
        { authorId: decodedToken._id, recipientId: authorId, postId },
        { withCredentials: true, headers: { Authorization: `Bearer ${token}` } }
      );

      setLikesCount(response.data.likes_count);
      setIsLiked(true);
      localStorage.setItem(`liked-${decodedToken._id}-${postId}`, JSON.stringify(true));
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
      const response = await axios.post(
        "http://localhost:8002/api/v2/interactions/unlike",
        { authorId: decodedToken._id, recipientId: authorId, postId },
        { withCredentials: true, headers: { Authorization: `Bearer ${token}` } }
      );

      setLikesCount(response.data.likes_count);
      setIsLiked(false);
      localStorage.setItem(`liked-${decodedToken._id}-${postId}`, JSON.stringify(false));
    } catch (err) {
      console.error("Error unliking post:", err.response?.data || err.message);
      setError(err.response?.data?.message || "Failed to unlike the post.");
    } finally {
      setIsUnliking(false);
    }
  };

  return (
    <div>
      <button
        onClick={isLiked ? handleUnlike : handleLike}
        className={`text-xl transition-all ${isLiked ? "text-red-500" : "text-gray-700"}`}
        disabled={isLiking || isUnliking}
      >
        {isLiked ? "❤️ Liked" : "🤍 Like"} ({likesCount})
      </button>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};

export default LikeButton;