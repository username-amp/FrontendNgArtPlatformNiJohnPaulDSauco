import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    bio: "",
    profile_picture: null,
    cover_photo: null,
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8002/api/v2/auth/profile", {
        withCredentials: true,
      })
      .then((response) => {
        const { username, email, bio, profile_picture, cover_photo } =
          response.data.user;
        setFormData({
          username: username || "",
          email: email || "",
          bio: bio || "",
          profile_picture: profile_picture || "",
          cover_photo: cover_photo || "",
        });
      })
      .catch((err) => {
        console.error("Error fetching user data:", err);
        setError("Failed to fetch profile data");
      });
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      if (files[0] && !files[0].type.startsWith("image/")) {
        setError("Only image files are allowed for profile and cover photos.");
        return;
      }
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updateData = new FormData();
    updateData.append("username", formData.username);
    updateData.append("email", formData.email);
    updateData.append("bio", formData.bio);

    console.log("Form data being sent:", formData);

    if (formData.profile_picture) {
      updateData.append("profile_picture", formData.profile_picture);
      console.log("Appended profile_picture:", formData.profile_picture);
    }

    if (formData.cover_photo) {
      updateData.append("cover_photo", formData.cover_photo);
      console.log("Appended cover_photo:", formData.cover_photo);
    }

    try {
      const response = await axios.put(
        "http://localhost:8002/api/v2/auth/update-profile",
        updateData,
        {
          headers: {
            Authorization: `Bearer ${document.cookie.split("=")[1]}`,
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      if (response.data.status) {
        alert("Profile updated successfully!");
        navigate("/settings/edit-profile");
      }
    } catch (err) {
      console.error("Error updating profile:", err);
      setError(
        err.response?.data?.message ||
          "An error occurred while updating your profile."
      );
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Edit Profile</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="username" className="block text-sm font-medium">
            Username
          </label>
          <input
            id="username"
            type="text"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium">
            Email
          </label>
          <input
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <div>
          <label htmlFor="bio" className="block text-sm font-medium">
            Bio
          </label>
          <textarea
            id="bio"
            name="bio"
            value={formData.bio}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div>
          <label
            htmlFor="profile_picture"
            className="block text-sm font-medium"
          >
            Profile Picture
          </label>
          <input
            id="profile_picture"
            type="file"
            name="profile_picture"
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div>
          <label htmlFor="cover_photo" className="block text-sm font-medium">
            Cover Photo
          </label>
          <input
            id="cover_photo"
            type="file"
            name="cover_photo"
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div>
          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Update Profile
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
