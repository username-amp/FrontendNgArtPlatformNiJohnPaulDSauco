import React, { useEffect } from "react";
import LikeButton from "./LikeButton";
import CommentSection from "./CommentSection";
import SavePostButton from "./SavePostButton";

const ViewPostPopup = ({ post, isOpen, onClose }) => {
  useEffect(() => {}, [post]);

  if (!post) {
    return null;
  }

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 ${
        isOpen ? "opacity-100 visible" : "opacity-0 invisible"
      } transition-opacity duration-300`}
    >
      <div
         className={`bg-white rounded-xl max-w-5xl w-full relative shadow-lg overflow-hidden flex transform transition-transform duration-300 ${
          isOpen ? "animate-scale-in" : "animate-scale-out"
        }`}
      >
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-gray-600 hover:text-black"
          onClick={onClose}
        >
          ✕
        </button>

        {/* Left: Image Section */}
        <div className="w-1/2 flex items-center justify-center bg-gray-100">
          {post.image_url.length > 0 && (
            <img
              src={`http://localhost:8002${post.image_url[0]}`}
              alt={post.title}
              className="max-w-full h-[500px] object-cover"
            />
          )}
        </div>

        {/* Right: Post Details Section */}
        <div className="w-1/2 p-6 flex flex-col">
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">{post.title}</h2>
          <p className="text-gray-500 mb-3">{post.description}</p>
          <p className="text-gray-400 text-sm mb-5">
            Posted by:{" "}
            <span className="font-semibold">{post.author_id?.username}</span> on{" "}
            {new Date(post.createdAt).toLocaleString()}
          </p>

          {/* Like and Save Buttons */}
          <div className="flex gap-4 mb-5">
            <LikeButton
              postId={post._id}
              postLikes={post.likes}
              authorId={post.author_id?._id || post.author_id}
            />
            <SavePostButton
              postId={post._id}
              userId={post.author_id?._id || post.author_id}
            />
          </div>

          {/* Comments Section */}
          <div className="mt-auto max-h-64 overflow-y-auto">
            <CommentSection
              postId={post._id}
              authorId={post.author_id?._id || post.author_id}
              recipientId={post.author_id?._id || post.author_id}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewPostPopup;
