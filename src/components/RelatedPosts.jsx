import React, { useEffect, useState } from 'react';
import axios from 'axios';

const RelatedPosts = ({ categoryId, currentPostId }) => {
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRelatedPosts = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8002/api/v2/post/related-posts/${categoryId}`,
          {
            method: 'GET',
            withCredentials: true,
          }
        );

        const filteredPosts = response.data.relatedPosts.filter(
          (post) => post._id !== currentPostId
        );

        setRelatedPosts(filteredPosts || []);
      } catch (err) {
        setError(err.message || 'Failed to fetch related posts');
      }
    };

    fetchRelatedPosts();
  }, [categoryId, currentPostId]);

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (relatedPosts.length === 0) {
    return <p className="text-gray-600 text-center">No related posts found.</p>;
  }

  return (
    <div className="columns-2 sm:columns-3 lg:columns-7 gap-0 px-4">
      {relatedPosts.map((post) => (
        <div
          key={post._id}
          className="relative p-1 bg-white shadow-md rounded-lg cursor-pointer overflow-hidden group"
          onClick={() => window.location.href = `/post/${post._id}`} // Navigate to the post
        >
          {post.image_url?.length > 0 && (
            <img
              src={`http://localhost:8002${post.image_url[0]}`}
              alt={post.title}
              className="w-full rounded-md object-contain group-hover:opacity-30 transition-opacity duration-300"
            />
          )}
          <div
            className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-80"
          >
            <div className="w-16 h-16 bg-gray-200 flex items-center justify-center rounded-full text-xl font-bold text-black mb-2">
              {post.author_id?.username?.charAt(0)?.toUpperCase() ||
                post.author_id?.firstname?.charAt(0)?.toUpperCase() ||
                '?'}
            </div>
            <span className="text-white text-xl font-semibold">
              {post.author_id?.username || post.author_id?.firstname || 'Unknown'}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RelatedPosts;
