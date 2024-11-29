import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ArtsHome = () => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  const getTokenFromCookies = () => {
    const cookies = document.cookie.split('; ');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.startsWith('token=')) {
        return decodeURIComponent(cookie.substring('token='.length));
      }
    }
    return null;
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const token = getTokenFromCookies();
      if (!token) {
        console.error('No token found in cookies');
        return;
      }

      try {
        const response = await axios.get('http://localhost:8002/api/v2/post/get-post/', {
          method: 'GET',
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  const handlePostClick = (postId) => {
    navigate(`/post/${postId}`);
  };

  return (
    <div className="columns-2 sm:columns-3 lg:columns-7 gap-0 px-4">
      {posts.map((post) => (
        <div
          key={post._id}
          className="relative p-1 bg-white shadow-md rounded-lg cursor-pointer overflow-hidden group"
          onClick={() => handlePostClick(post._id)}
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

export default ArtsHome;
