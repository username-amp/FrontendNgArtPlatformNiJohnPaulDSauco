import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import badWordsList from "./badwords.json";
import axiosInstance from "../utils/axiosInstance";

const CommentSection = ({ postId, authorId, recipientId }) => {
  const [comments, setComments] = useState([]);
  const [commentContent, setCommentContent] = useState("");
  const [editContent, setEditContent] = useState("");
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentUserId, setCurrentUserId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axiosInstance.get(
          `/interactions/comments/${postId}`
        );
        console.log("Fetched Comments:", response.data.comments);
        response.data.comments.forEach((comment) => {
          console.log("Comment User ID:", comment.user_id);
        });
        setComments(response.data.comments || []);
      } catch (err) {
        console.error(
          "Error fetching comments:",
          err.response?.data || err.message
        );
        setError("Failed to load comments.");
      }
    };
    fetchComments();
  }, [postId]);

  useEffect(() => {
    const token = getTokenFromCookies();
    if (token) {
      const decodedToken = jwtDecode(token);
      setCurrentUserId(decodedToken._id);
      console.log("Current User ID from token:", decodedToken._id);
    } else {
      console.log("No token found");
    }
  }, []);

  const getTokenFromCookies = () => {
    const cookies = document.cookie.split("; ");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.startsWith("token=")) {
        return decodeURIComponent(cookie.substring("token=".length));
      }
    }
    return null;
  };

  const containsBadWords = (text) => {
    const words = text.toLowerCase().split(/\s+/);
    return words.some((word) => badWordsList.badwords.includes(word));
  };

  const handleAddComment = async () => {
    if (!commentContent.trim()) return;

    setIsLoading(true);
    setError(null);

    const token = getTokenFromCookies();
    if (!token) {
      setError("No token found in cookies.");
      setIsLoading(false);
      return;
    }

    try {
      const decodedToken = jwtDecode(token);
      const userId = decodedToken._id;

      if (containsBadWords(commentContent)) {
        setError("Your comment contains inappropriate content.");
        setIsLoading(false);
        return;
      }

      const response = await axiosInstance.post("/interactions/comment", {
        postId,
        authorId,
        recipientId,
        commentContent,
      });

      const newComment = response.data.comment;
      if (newComment) {
        setComments((prev) => [...prev, newComment]);
        setCommentContent("");
      }

      if (response.status === 200) {
        navigate(0);
      }
    } catch (err) {
      console.error("Error adding comment:", err.response?.data || err.message);
      setError(err.response?.data?.message || "Failed to add the comment.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (commentId, currentContent) => {
    setEditingCommentId(commentId);
    setEditContent(currentContent);
  };

  const handleSaveEdit = async (commentId) => {
    setLoading(true);
    try {
      const response = await axiosInstance.put(
        `/interactions/edit-comment/${commentId}`,
        {
          postId,
          commentId,
          newContent: editContent,
        }
      );

      if (response.status === 200) {
        setEditingCommentId(null);
        setEditContent("");
        navigate(0);
      }
    } catch (error) {
      console.error("Error updating comment:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (commentId) => {
    const confirmation = window.confirm(
      "Are you sure you want to delete this comment?"
    );
    if (!confirmation) return;

    setLoading(true);
    try {
      const response = await axiosInstance.delete(
        `/interactions/delete-comment/${commentId}`,
        {
          data: { postId, commentId },
        }
      );

      if (response.status === 200) {
        navigate(0);
      }
    } catch (error) {
      console.error("Error deleting comment:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-5">
      <h3 className="text-lg font-semibold mb-3 text-gray-900">Comments</h3>
      <div className="space-y-3 mb-5">
        {comments.length === 0 ? (
          <p className="text-gray-500">No comments yet.</p>
        ) : (
          comments.map((comment) => (
            <div
              key={comment._id}
              className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg shadow-md"
            >
              <div className="w-8 h-8 rounded-full bg-gray-300 flex-shrink-0"></div>
              <div>
                <p className="text-sm font-medium text-gray-800">
                  {comment.authorUsername}
                </p>
                {editingCommentId === comment._id ? (
                  <div className="edit-comment">
                    <textarea
                      value={editContent}
                      onChange={(e) => setEditContent(e.target.value)}
                      className="w-full p-2 bg-gray-100 border rounded-md"
                    />
                    <button
                      onClick={() => handleSaveEdit(comment._id)}
                      disabled={loading}
                      className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditingCommentId(null)}
                      className="text-red-500 ml-2"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <p className="text-gray-600">{comment.content}</p>
                )}
                <p className="text-xs text-gray-500">
                  {comment.createdAt
                    ? new Date(comment.createdAt).toLocaleString()
                    : "Unknown date"}
                </p>
                <div className="mt-2 flex gap-3">
                  {/* Show edit and delete buttons only if the current user is the comment's author */}
                  {comment.user_id &&
                    String(currentUserId) === String(comment.user_id._id) && (
                      <>
                        <button
                          onClick={() =>
                            handleEdit(comment._id, comment.content)
                          }
                          className="text-blue-500"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(comment._id)}
                          disabled={loading}
                          className="text-red-500"
                        >
                          Delete
                        </button>
                      </>
                    )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="flex gap-3 items-center">
        <input
          type="text"
          value={commentContent}
          onChange={(e) => setCommentContent(e.target.value)}
          placeholder="Write a comment..."
          className="flex-grow p-2 bg-gray-100 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleAddComment}
          disabled={isLoading}
          className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 disabled:opacity-50"
        >
          {isLoading ? "Posting..." : "Post"}
        </button>
      </div>
      {error && <p className="text-red-500 mt-2 text-sm">{error}</p>}
    </div>
  );
};

export default CommentSection;
