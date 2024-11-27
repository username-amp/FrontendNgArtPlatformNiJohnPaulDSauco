import React, { useState, useEffect } from "react";
import axios from "axios";

const SavePostButton = ({ postId, userId }) => {
  const [isSaved, setIsSaved] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const storedSaveStatus = localStorage.getItem(`saved-${userId}-${postId}`);
    setIsSaved(storedSaveStatus ? JSON.parse(storedSaveStatus) : false);
  }, [postId, userId]);

  const handleSavePost = async () => {
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
        localStorage.setItem(`saved-${userId}-${postId}`, true)
        alert("Post saved successfully!");
      }
    } catch (err) {
      setError("Failed to save post. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleUnsavePost = async () => {
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
        alert("Post unsaved successfully!");
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
        <button
          onClick={handleUnsavePost}
          disabled={loading}
          className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600"
        >
          {loading ? "Unsaving..." : "Unsave Post"}
        </button>
      ) : (
        <button
          onClick={handleSavePost}
          disabled={loading}
          className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
        >
          {loading ? "Saving..." : "Save Post"}
        </button>
      )}
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  );
};

export default SavePostButton;
