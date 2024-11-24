import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ViewPostPopup from './ViewPostPopup';

const ArtsHome = () => {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const handlePostClick = (post) => {
    setSelectedPost(post);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedPost(null);
    setIsModalOpen(false);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
      {posts.map((post) => (
        <div
          key={post._id}
          className="p-4 bg-white shadow-md rounded-lg flex flex-col items-center cursor-pointer"
          onClick={() => handlePostClick(post)}
        >
          <div
            className="w-16 h-16 bg-gray-200 flex items-center justify-center rounded-full text-xl font-bold text-white"
            style={{ backgroundColor: '#2d3748' }}
          >
            {post.author_id?.username.charAt(0).toUpperCase()}
          </div>
          <h2 className="text-lg font-semibold mt-2 text-center">{post.title}</h2>
          <p className="text-sm text-gray-500 text-center">{post.description}</p>
          {post.image_url?.length > 0 && (
            <div className="mt-2">
              {post.image_url.map((image, index) => (
                <img
                  key={index}
                  src={`http://localhost:8002${image}`}
                  alt={post.title}
                  className="w-full h-auto max-h-40 rounded-md object-cover mt-2"
                />
              ))}
            </div>
          )}
        </div>
      ))}

      <ViewPostPopup
        post={selectedPost}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </div>
  );
};

export default ArtsHome;
