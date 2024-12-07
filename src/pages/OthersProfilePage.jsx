import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";

const OthersProfilePage = () => {
  const { authorId } = useParams();
  const [userData, setUserData] = useState(null);
  const [posts, setPosts] = useState([]);
  const [userPostsCount, setUserPostsCount] = useState(0);
  const [activeTab, setActiveTab] = useState("gallery");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (!authorId) return;

    const fetchUserData = async () => {
      try {
        const { data } = await axiosInstance.get(
          `/auth/author-profile-details/${authorId}`
        );
        setUserData(data);
      } catch (err) {
        console.error("Error fetching user profile data:", err);
        setError("Failed to fetch user data.");
      }
    };

    const fetchPosts = async () => {
      try {
        const { data } = await axiosInstance.get(
          `/post/get-all-posts-of-user-by-user-id/${authorId}`
        );
        setPosts(data.posts);
      } catch (err) {
        console.error("Error fetching user posts:", err);
      }
    };

    const fetchUserPostsCount = async () => {
      try {
        const { data } = await axiosInstance.get(
          `/post/get-user-posts-count/${authorId}`
        );
        setUserPostsCount(data.postCount);
      } catch (err) {
        console.error("Error fetching user posts count:", err.response || err);
        setError("Failed to fetch user posts count");
      }
    };

    fetchUserData();
    fetchPosts();
    fetchUserPostsCount();
  }, [authorId]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  if (error) return <div>{error}</div>;
  if (!userData) return <div>Loading...</div>;

  const { user } = userData || {};

  const renderProfilePicture = user?.profilePicture ? (
    <img
      src={`http://localhost:8002${user.profilePicture}`}
      alt={`${user.username}'s profile`}
      className="w-full h-full object-cover rounded-full"
    />
  ) : (
    user?.username?.charAt(0).toUpperCase()
  );

  const renderPosts = () => {
    let displayPosts = [];
    if (activeTab === "gallery") {
      displayPosts = posts;
    }

    return displayPosts.length > 0 ? (
      <div className="columns-2 sm:columns-3 lg:columns-5 xl:columns-7 gap-0 px-0">
        <button
          className="absolute top-4 left-4 text-gray-600 hover:text-black"
          onClick={() => navigate("/home")}
        >
          <ArrowLeftIcon className="w-10 h-10" />
        </button>
        {displayPosts.map((post) => (
          <div
            key={post._id}
            className="relative p-1 bg-white overflow-hidden rounded-lg group cursor-pointer"
            onClick={() => navigate(`/post/${post._id}`)}
          >
            {post.image_url?.length > 0 && (
              <img
                src={`http://localhost:8002${post.image_url[0]}`}
                alt={post.title || "Post Image"}
                className="w-full h-auto max-h-80 object-contain group-hover:opacity-90 transition-all duration-300"
                style={{ maxWidth: "100%" }}
              />
            )}
            <div className="absolute inset-0 flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 bg-black bg-opacity-50 transition-all duration-300">
              <div className="rounded-full w-14 h-14 bg-gray-300 flex items-center justify-center text-xl font-bold text-black">
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
    <div className="max-h-screen bg-gray-50 flex flex-col items-center py-12 px-4">
      <div className="w-full max-w-8xl bg-white rounded-lg p-6">
        <div className="flex flex-col items-center">
          {/* Profile Picture Section */}
          <div className="w-20 h-20 rounded-full bg-gray-500 flex items-center justify-center text-white text-3xl font-bold">
            {renderProfilePicture}
          </div>

          <h1 className="mt-4 text-xl font-semibold text-gray-700">
            {user.username}
          </h1>
          <p className="text-gray-500">{user.email}</p>

          <p className="mt-2 text-sm text-gray-600">"{user.bio}"</p>
          <div className="mt-4 flex space-x-6 text-sm text-gray-600">
            <span>Posts: {userPostsCount}</span>
            <span>Followers: {user.followers}</span>
            <span>Following: {user.following}</span>
          </div>
        </div>

        <div className="flex justify-center space-x-6 mt-8">
          {["gallery"].map((tab) => (
            <button
              key={tab}
              onClick={() => handleTabChange(tab)}
              className={`py-2 px-4 rounded-lg text-sm ${
                activeTab === tab
                  ? "bg-gray-500 text-white shadow-md"
                  : "bg-gray-200 text-gray-600"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        <div className="mt-8">{renderPosts()}</div>
      </div>
    </div>
  );
};

export default OthersProfilePage;
