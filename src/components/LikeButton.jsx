import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { HeartIcon } from "@heroicons/react/24/solid";

const LikeButton = ({ postId, postLikes, authorId }) => {
  const [isLiking, setIsLiking] = useState(false);
  const [isUnliking, setIsUnliking] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(postLikes?.length || 0);
  const [usersWhoLiked, setUsersWhoLiked] = useState([]);
  const [showLikesList, setShowLikesList] = useState(false); // State for hover

  useEffect(() => {
    const initializeLikeStatus = () => {
      const token = Cookies.get("token");
      if (token) {
        try {
          const decodedToken = jwtDecode(token);
          const userLiked = postLikes.some(
            (like) => like.user_id === decodedToken._id
          );
          setIsLiked(userLiked);
        } catch (err) {
          console.error("Error decoding token:", err.message);
        }
      }
    };

    initializeLikeStatus();
  }, [postLikes, postId]);

 const fetchUsersWhoLiked = async () => {
   try {
     const response = await axios.get(
       `http://localhost:8002/api/v2/post/likes/${postId}`,
       { withCredentials: true }
     );
     // Map over the response data and get the `user_id` from the `likes` array
     setUsersWhoLiked(response.data.likes.map((like) => like.user_id)); // Extract user_id from likes
   } catch (err) {
     console.error("Error fetching users who liked the post:", err.message);
   }
 };



  const handleMouseEnter = () => {
    setShowLikesList(true);
    fetchUsersWhoLiked();
  };

  const handleMouseLeave = () => {
    setShowLikesList(false);
  };

  const handleLike = async () => {
    if (isLiking) return;
    setIsLiking(true);

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
    } catch (err) {
      console.error("Error liking post:", err.message);
    } finally {
      setIsLiking(false);
    }
  };

  const handleUnlike = async () => {
    if (isUnliking) return;
    setIsUnliking(true);

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
    } catch (err) {
      console.error("Error unliking post:", err.message);
    } finally {
      setIsUnliking(false);
    }
  };

  return (
    <div className="relative flex flex-col items-start mt-2">
      <div
        className="flex items-center gap-2"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <button
          onClick={isLiked ? handleUnlike : handleLike}
          className={`transition-all ${
            isLiked ? "text-red-500" : "text-gray-500"
          }`}
        >
          <HeartIcon className="w-6 h-6" />
        </button>
        <p className="text-sm">
          {likesCount} {likesCount === 1 ? "Like" : "Likes"}
        </p>
      </div>
      {showLikesList && usersWhoLiked.length > 0 && (
        <div className="absolute top-8 left-0 bg-white border border-gray-300 rounded shadow-lg p-2 w-48">
          <ul className="text-sm">
            {usersWhoLiked.map((user) => (
              <li
                key={user.user_id}
                className="text-gray-700 flex items-center gap-2"
              >
                {user.profile_picture && (
                  <img
                    src={user.profile_picture}
                    alt={user.username}
                    className="w-6 h-6 rounded-full"
                  />
                )}
                <span>{user.username}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default LikeButton;
