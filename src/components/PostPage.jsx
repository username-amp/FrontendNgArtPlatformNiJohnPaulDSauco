import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeftIcon } from '@heroicons/react/24/solid';
import LikeButton from './LikeButton';
import CommentSection from './CommentSection';
import SavePostButton from './SavePostButton';
import RelatedPosts from './RelatedPosts';

const PostPage = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const navigate = useNavigate()

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
    const fetchPost = async () => {
      const token = getTokenFromCookies();
      if (!token) {
        console.error('No token found in cookies');
        return;
      }

      try {
        const response = await axios.get(`http://localhost:8002/api/v2/post/get-post/${postId}`, {
          method: 'GET',
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setPost(response.data);
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    };

    fetchPost();
  }, [postId]);

  if (!post) {
    return <div className="text-center text-xl">Loading...</div>;
  }

  const { username, profile_picture, category } = post.author_id || {};

  return (
    <div className="max-w-screen-xl mx-auto p-8"> {/* Larger page layout */}
      {/* Back Button with left arrow icon */}
      <button
        className="absolute top-4 left-4 text-gray-600 hover:text-black"
        onClick={() => navigate("/home")}
      >
        <ArrowLeftIcon className="w-10 h-10" />
      </button>

      <div className="bg-white  p-8 relative overflow-hidden"> {/* Larger padding and shadow */}
        <div className="flex flex-col md:flex-row">
          {/* Left: Image Section */}
          <div className="w-full md:w-1/2 flex items-center justify-center  p-4">
            {post.image_url.length > 0 && (
              <img
                src={`http://localhost:8002${post.image_url[0]}`}
                alt={post.title}
                className="max-w-full h-[500px] object-cover rounded-lg shadow-lg"
              />
            )}
          </div>

          {/* Right: Post Details Section */}
          <div className="w-full md:w-1/2 p-8 flex flex-col space-y-6">

            {/* Like and Save Buttons */}
            <div className="flex gap-6 mb-0">
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

            <div className="flex items-center space-x-4 mb-4">
              {/* Display profile picture or default icon */}
              {profile_picture ? (
                <img
                  src={`http://localhost:8002${profile_picture}`}
                  alt={username}
                  className="w-10 h-10 rounded-full object-cover"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-gray-400 flex items-center justify-center text-white">
                  {username?.charAt(0).toUpperCase()} {/* Display first letter of username */}
                </div>
              )}
              <p className="text-gray-500 text-sm">
                <span className="font-semibold">{username}</span> on{" "}
                {new Date(post.createdAt).toLocaleString()}
              </p>
            </div>

            <h2 className="text-4xl font-bold text-gray-800 mb-4">{post.title}</h2> {/* Larger title */}
            <p className="text-xl text-gray-600 mb-4">{post.description}</p> {/* Larger description */}

            {/* Comments Section */}
            <div className="mt-auto max-h-[60vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
              <CommentSection
                postId={post._id}
                authorId={post.author_id?._id || post.author_id}
                recipientId={post.author_id?._id || post.author_id}
              />
            </div>
          </div>
        </div>

      </div>

      
      <div className="mt-8">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">Related Posts</h3>
        <RelatedPosts categoryId={post.category} currentPostId={post._id} />
      </div>
 
    </div>
  );
};

export default PostPage;
