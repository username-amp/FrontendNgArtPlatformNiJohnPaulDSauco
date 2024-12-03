import React, { useState, useEffect } from "react";
import axiosInstance from "../utils/axiosInstance";

const FollowButton = ({ authorId, loggedInUserId }) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const allFollowStatus = JSON.parse(localStorage.getItem("followStatus")) || {};
    const userFollowStatus = allFollowStatus[loggedInUserId] || {};
    
    setIsFollowing(!!userFollowStatus[authorId]);
  }, [authorId, loggedInUserId]);

  const handleFollow = async () => {
    if (isFollowing) return;
    setLoading(true);

    try {
      await axiosInstance.post(`/interactions/follow/${authorId}`);
      setIsFollowing(true);

      const allFollowStatus = JSON.parse(localStorage.getItem("followStatus")) || {};
      const userFollowStatus = allFollowStatus[loggedInUserId] || {};
      userFollowStatus[authorId] = true;
      allFollowStatus[loggedInUserId] = userFollowStatus;
      localStorage.setItem("followStatus", JSON.stringify(allFollowStatus));

      console.log(`Followed user with ID: ${authorId}`);
    } catch (error) {
      console.error("Error following user:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUnfollow = async () => {
    if (!isFollowing) return;
    setLoading(true);

    try {
      await axiosInstance.post(`/interactions/unfollow/${authorId}`);
      setIsFollowing(false);

      const allFollowStatus = JSON.parse(localStorage.getItem("followStatus")) || {};
      const userFollowStatus = allFollowStatus[loggedInUserId] || {};
      delete userFollowStatus[authorId];
      
      if (Object.keys(userFollowStatus).length === 0) {
        delete allFollowStatus[loggedInUserId];
      } else {
        allFollowStatus[loggedInUserId] = userFollowStatus;
      }
      localStorage.setItem("followStatus", JSON.stringify(allFollowStatus));

      console.log(`Unfollowed user with ID: ${authorId}`);
    } catch (error) {
      console.error("Error unfollowing user:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={isFollowing ? handleUnfollow : handleFollow}
      disabled={loading}
      className={`px-4 py-2 rounded-full ${
        isFollowing ? "bg-red-500" : "bg-blue-500"
      } text-white hover:opacity-90`}
    >
      {loading ? "Processing..." : isFollowing ? "Unfollow" : "Follow"}
    </button>
  );
};

export default FollowButton;
