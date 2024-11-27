import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const CommentSection = ({ postId, authorId, recipientId }) => {
  const [comments, setComments] = useState([]);
  const [commentContent, setCommentContent] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const token = Cookies.get("token");
        
        const response = await axios.get(
          `http://localhost:8002/api/v2/interactions/comments/${postId}`,
          {
            withCredentials: true,
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        
        setComments(response.data.comments || []);
      } catch (err) {
        console.error("Error fetching comments:", err.response?.data || err.message);
        setError("Failed to load comments.");
      }
    };
  
    fetchComments();
  }, [postId]);
  

  const handleAddComment = async () => {
    if (!commentContent.trim()) return;
  
    setIsLoading(true);
    setError(null);
  
    try {
      const token = Cookies.get("token");
      console.log("Token:", token);
  
      if (!token) {
        throw new Error("Token is missing. Please log in.");
      }
  
      const response = await axios.post(
        "http://localhost:8002/api/v2/interactions/comment",
        { postId, authorId, recipientId, commentContent },
        {
          withCredentials: true,
          headers:  { Authorization: `Bearer ${token}` },
        }
      );
  
      const newComment = response.data.comment;
      if (newComment) {
        setComments((prev) => [...prev, newComment]);
        setCommentContent("");
      }
    } catch (err) {
      console.error("Error adding comment:", err.response?.data || err.message);
      setError(err.response?.data?.message || "Failed to add the comment.");
    } finally {
      setIsLoading(false);
    }
  };
  

  return (
    <div className="mt-5">
      <h3 className="text-lg font-semibold mb-3">Comments</h3>
      <div className="space-y-3 mb-5">
        {comments.length === 0 ? (
          <p>No comments yet.</p>
        ) : (
          comments.map((comment, index) => (
            <div key={index} className="p-3 bg-gray-100 rounded-md shadow-sm">
              <p className="text-gray-700">{comment?.content || "No content available"}</p>
              <p className="text-sm text-gray-500">
                By {comment?.authorUsername || "Unknown"} on{" "}
                {comment?.createdAt ? new Date(comment.createdAt).toLocaleString() : "Unknown date"}
              </p>
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
          className="flex-grow p-2 border rounded-md shadow-sm"
        />
        <button
          onClick={handleAddComment}
          disabled={isLoading}
          className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-blue-600 disabled:opacity-50"
        >
          {isLoading ? "Posting..." : "Comment"}
        </button>
      </div>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
};

export default CommentSection;
