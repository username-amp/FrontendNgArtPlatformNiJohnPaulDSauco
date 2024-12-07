import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import axiosInstance from "../utils/axiosInstance";

const FollowButton = ({ authorId }) => {
  const [loggedInUserId, setLoggedInUserId] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setLoggedInUserId(decodedToken._id);
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, []);

  useEffect(() => {
    if (!loggedInUserId || loggedInUserId === authorId) return;

    const fetchFollowStatus = async () => {
      try {
        const response = await axiosInstance.get(
          `/interactions/check-follow/${authorId}`
        );
        setIsFollowing(response.data.isFollowing);
      } catch (error) {
        console.error("Error fetching follow status:", error);
      }
    };

    fetchFollowStatus();
  }, [authorId, loggedInUserId]);

  const handleFollow = async () => {
    if (!loggedInUserId || loggedInUserId === authorId) {
      console.error("Invalid follow action.");
      return;
    }
    if (isFollowing) return;

    setLoading(true);

    try {
      await axiosInstance.post(`/interactions/follow/${authorId}`);
      setIsFollowing(true);
    } catch (error) {
      console.error("Error following user:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUnfollow = async () => {
    if (!loggedInUserId || loggedInUserId === authorId) {
      console.error("Invalid unfollow action.");
      return;
    }
    if (!isFollowing) return;

    setLoading(true);

    try {
      await axiosInstance.post(`/interactions/unfollow/${authorId}`);
      setIsFollowing(false);
    } catch (error) {
      console.error("Error unfollowing user:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loggedInUserId === authorId) {
    return null;
  }

  return (
    <button
      onClick={isFollowing ? handleUnfollow : handleFollow}
      disabled={loading || !loggedInUserId}
      className={`px-4 py-2 rounded-full ${
        isFollowing ? "bg-red-500" : "bg-blue-500"
      } text-white hover:opacity-90`}
    >
      {loading
        ? "Processing..."
        : !loggedInUserId
        ? "Log in to Follow"
        : isFollowing
        ? "Unfollow"
        : "Follow"}
    </button>
  );
};

export default FollowButton;
