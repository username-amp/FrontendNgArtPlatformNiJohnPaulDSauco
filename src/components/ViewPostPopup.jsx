import React from 'react';

const ViewPostPopup = ({ post, isOpen, onClose }) => {
  if (!isOpen || !post) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-3xl w-full relative shadow-lg overflow-hidden">
        <button
          className="absolute top-4 right-4 text-gray-600 hover:text-black"
          onClick={onClose}
        >
          ✕
        </button>
        <div className="text-center">
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">{post.title}</h2>
          <p className="text-gray-500 mb-3">{post.description}</p>
          <p className="text-gray-400 text-sm mb-5">
            Posted by: <span className="font-semibold">{post.author_id?.username}</span> on{' '}
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
          <div className="flex justify-between items-center mt-6 border-t pt-4 text-sm text-gray-600">
            <button className="flex items-center gap-1 text-red-500 hover:text-red-600">
              ♥ {post.likes_count}
            </button>
            <button className="flex items-center gap-1 text-gray-500 hover:text-gray-600">
              💬 {post.comments_count}
            </button>
            <button className="flex items-center gap-1 text-blue-500 hover:text-blue-600">
              🔖 Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewPostPopup;
