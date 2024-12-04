import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark, faTrash } from "@fortawesome/free-solid-svg-icons";

const SavePostButton = ({ postId, userId: propUserId }) => {
  const [isSaved, setIsSaved] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getUserIdFromToken = () => {
    const token = document.cookie
      .split("; ")
      .find((cookie) => cookie.startsWith("token="))
      ?.split("=")[1];
    if (!token) return null;

    try {
      const decoded = JSON.parse(atob(token.split(".")[1]));
      return decoded._id;
    } catch (err) {
      console.error("Error decoding token:", err);
      return null;
    }
  };

  const userId = getUserIdFromToken() || propUserId;

  if (!userId) {
    console.error("No userId found. Ensure the token is available and valid.");
    return null;
  }

  useEffect(() => {
    const storedSaveStatus = localStorage.getItem(`saved-${userId}-${postId}`);
    setIsSaved(storedSaveStatus ? JSON.parse(storedSaveStatus) : false);
  
  }, [postId, userId]);

  const handleSavePost = async () => {
    if (!userId) {
      setError("User not authenticated. Cannot save post.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:8002/api/v2/interactions/save",
        {
          postId,
          userId,
        },
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        setIsSaved(true);
        localStorage.setItem(`saved-${userId}-${postId}`, true);
      }
    } catch (err) {
      setError("Failed to save post. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleUnsavePost = async () => {
    if (!userId) {
      setError("User not authenticated. Cannot unsave post.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.delete(
        "http://localhost:8002/api/v2/post/remove-saved-post",
        {
          data: {
            postId,
            userId,
          },
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        setIsSaved(false);
        localStorage.removeItem(`saved-${userId}-${postId}`);
      }
    } catch (err) {
      setError("Failed to unsave post. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {isSaved ? (
        <div className="flex items-center space-x-2">
          <button
            onClick={handleUnsavePost}
            disabled={loading}
            className="p-2 rounded-md hover:bg-gray-200 transition-all"
          >
            <FontAwesomeIcon icon={faTrash} size="lg" className="text-red-500" />
          </button>
          <span className="text-green-600 font-semibold">Saved</span> {/* Indication text */}
        </div>
      ) : (
        <div className="flex items-center space-x-2">
          <button
            onClick={handleSavePost}
            disabled={loading}
            className="p-2 rounded-md hover:bg-gray-200 transition-all"
          >
            <FontAwesomeIcon icon={faBookmark} size="lg" className="text-blue-500" />
          </button>
          <span className="text-gray-600">Save</span>
        </div>
      )}
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  );
};

export default SavePostButton;
