import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import { ArrowLeftIcon } from '@heroicons/react/24/solid';

const ProfilePage = () => {
  const [userData, setUserData] = useState(null);
  const [posts, setPosts] = useState([]);
  const [savedPosts, setSavedPosts] = useState([]);
  const [likedPosts, setLikedPosts] = useState([]);
  const [userPostsCount, setUserPostsCount] = useState(0);
  const [activeTab, setActiveTab] = useState("gallery");
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState(null);

  const navigate = useNavigate();

  const getTokenFromCookies = () => {
    const cookie = document.cookie
      .split(";")
      .find((cookie) => cookie.trim().startsWith("token="));
    if (cookie) {
      return cookie.split("=")[1];
    }
    return null;
  };

  useEffect(() => {
    const token = getTokenFromCookies();
    if (token) {
      const decodedToken = JSON.parse(atob(token.split(".")[1])); 
      setUserId(decodedToken._id);
    }
  }, []);

  useEffect(() => {
    if (userId) {
      const fetchUserData = async () => {
        try {
          const { data } = await axiosInstance.get(`/auth/profile-details`);
          setUserData(data);
        } catch (err) {
          console.error("Error fetching user profile data:", err);
          setError("Failed to fetch user data.");
        }
      };

      const fetchPosts = async () => {
        try {
          const { data } = await axiosInstance.get(`/post/get-all-posts-of-user-by-user-id/${userId}`);
          setPosts(data.posts);
        } catch (err) {
          console.error("Error fetching user posts:", err);
        }
      };

      const fetchSavedPosts = async () => {
        try {
          const { data } = await axiosInstance.get(`/post/get-saved-posts/${userId}`);
          console.log(data);
          setSavedPosts(data.savedPosts);
        } catch (err) {
          console.error("Error fetching saved posts:", err);
        }
      };
      

      const fetchLikedPosts = async () => {
        try {
          const { data } = await axiosInstance.get(`/interactions/get-liked-posts/${userId}`);
          setLikedPosts(data)
        } catch (err) {
          console.error("Error fetching liked posts:", err);
        }
      };

      const fetchUserPostsCount = async () => {
        try {
          const { data } = await axiosInstance.get(`/post/get-user-posts-count/${userId}`);
          setUserPostsCount(data.postCount);
        } catch (err) {
          console.error("Error fetching user posts count:", err);
          setError("Failed to fetch user posts count");
        }
      };

      fetchUserData();
      fetchPosts();
      fetchSavedPosts();
      fetchLikedPosts();
      fetchUserPostsCount();
    }
  }, [userId]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  if (error) return <div>{error}</div>;
  if (!userData) return <div>Loading...</div>;

  const { user } = userData;

  const renderPosts = () => {
    let displayPosts = [];
    if (activeTab === "gallery") {
      displayPosts = posts;
    } else if (activeTab === "saved") {
      displayPosts = savedPosts;
    } else if (activeTab === "liked") {
      displayPosts = likedPosts;
    }

   
    return displayPosts.length > 0 ? (
        <div className="columns-2 sm:columns-3 lg:columns-5 xl:columns-7 gap-0 px-4">
            {/* Back Button with left arrow icon */}
      <button
        className="absolute top-4 left-4 text-gray-600 hover:text-black"
        onClick={() => navigate("/home")}
      >
        <ArrowLeftIcon className="w-10 h-10" />
      </button>
          {displayPosts.map((post) => (
            <div
              key={post._id}
              className="relative p-1 bg-white overflow-hidden rounded-lg group cursor-pointer "
              onClick={() => navigate(`/post/${post._id}`)}
            >
              {post.image_url?.length > 0 && (
                <img
                  src={`http://localhost:8002${post.image_url[0]}`}
                  alt={post.title || "Post Image"}
                  className="w-full h-auto max-h-80 object-contain group-hover:opacity-90 transition-all duration-300"
                  style={{
                    maxWidth: "100%",
                  }}
                />
              )}
              <div className="absolute inset-0 flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 bg-black bg-opacity-50 transition-all duration-300">
                <div className="rounded-full w-14 h-14 bg-gray-200 flex items-center justify-center text-xl font-bold text-black">
                  {post.author_id?.username?.charAt(0)?.toUpperCase() || "?"}
                </div>
                <span className="mt-2 text-white font-medium text-lg">
                  {post.author_id?.username || "Unknown"}
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-gray-500 text-center mt-4">No posts available</div>
      );
    };
  
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center py-12 px-4">
        <div className="w-full max-w-5xl bg-white  rounded-lg p-6">
          {/* Profile Section */}
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 rounded-full overflow-hidden shadow-lg">
              {user.profilePicture ? (
                <img
                  src={user.profilePicture}
                  alt="Profile"
                  className="w-full rounded-md object-contain group-hover:opacity-30 transition-opacity duration-300"
                />
              ) : (
                <div className="w-full h-full bg-blue-500 flex items-center justify-center text-white text-3xl font-bold">
                  {user.username[0].toUpperCase()}
                </div>
              )}
            </div>
            <h1 className="mt-4 text-xl font-semibold text-gray-700">
              {user.username}
            </h1>
            <p className="text-gray-500">{user.email}</p>
            <p className="mt-2 text-sm text-gray-600">{user.bio}</p>
            <div className="mt-4 flex space-x-6 text-sm text-gray-600">
              <span>Posts: {userPostsCount}</span>
              <span>Followers: {user.followers}</span>
              <span>Following: {user.following}</span>
            </div>
          </div>
  
          {/* Tab Navigation */}
          <div className="flex justify-center space-x-6 mt-8">
            {["gallery", "saved", "liked"].map((tab) => (
              <button
                key={tab}
                onClick={() => handleTabChange(tab)}
                className={`py-2 px-4 rounded-lg text-sm ${
                  activeTab === tab
                    ? "bg-blue-500 text-white shadow-md"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
  
          {/* Posts */}
          <div className="mt-8">{renderPosts()}</div>
        </div>
      </div>
    );
  };
  
  export default ProfilePage;