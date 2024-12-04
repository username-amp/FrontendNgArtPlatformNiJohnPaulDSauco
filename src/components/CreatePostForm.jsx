import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import badWordsList from "./badwords.json";
import axiosInstance from "../utils/axiosInstance";
import axios from 'axios';
import { useNavigate } from "react-router-dom";


const CreatePostForm = ({ closeForm }) => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const files = e.target.files;
    if (files) {
      setFiles(Array.from(files));
    }
  };

  const getTokenFromCookies = () => {
    const cookies = document.cookie.split("; ");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.startsWith("token=")) {
        return decodeURIComponent(cookie.substring("token=".length));
      }
    }
    return null;
  };

  const containsBadWords = (text) => {
    const words = text.toLowerCase().split(/\s+/);
    return words.some((word) => badWordsList.badwords.includes(word));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const token = getTokenFromCookies();

    if (!token) {
      setError("No token found in cookies.");
      setIsSubmitting(false);
      return;
    }

    try {
      const decodedToken = jwtDecode(token);
      const userId = decodedToken._id;

      if (
        containsBadWords(formData.title) ||
        containsBadWords(formData.description)
      ) {
        setError("Your post contains inappropriate content.");
        setIsSubmitting(false);
        return;
      }

      const form = new FormData();
      form.append("title", formData.title);
      form.append("description", formData.description);
      form.append("author_id", userId);

      files.forEach((file) => {
        form.append("image_url", file);
      });

      try {
        const response = await axiosInstance.post("/post/create-post", form);

        if (response.data.status) {
          console.log("Post created successfully:", response.data);

          // Refetch the posts after post creation is successful
          try {
            const refetchResponse = await axios.get(
              "http://localhost:8002/api/v2/post/get-post/",
              {
                method: "GET",
                withCredentials: true,
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                }}
            );
            console.log("Posts refetched:", refetchResponse.data);

            // Optionally, you could store the fetched posts in the state and display them
            // setPosts(refetchResponse.data.posts);

          } catch (refetchError) {
            console.error("Error fetching posts:", refetchError.message);
          }

          navigate(0);
          closeForm();
        } else {
          setError(response.data.message || "Error creating post.");
          console.error("Error creating post:", response.data.message);
        }
      } catch (error) {
        console.error("Error:", error.message);
        setError(error.response?.data?.message || "An unexpected error occurred.");
      }
    } catch (error) {
      console.error("Error:", error.message);
      setError(error.message || "An unexpected error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div
        className={`bg-white p-6 rounded-lg shadow-lg w-96 transform transition-transform duration-300 ${
          isVisible ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
      >
        <h2 className="text-2xl font-bold mb-4">Create Post</h2>
        {error && <p className="text-red-500">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Title</label>
            <input
              type="text"
              name="title"
              className="w-full px-3 py-2 border rounded-md"
              value={formData.title}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              name="description"
              className="w-full px-3 py-2 border rounded-md"
              rows="4"
              value={formData.description}
              onChange={handleInputChange}
              required
            ></textarea>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Upload File</label>
            <input
              type="file"
              name="image_url"
              className="w-full px-3 py-2 border rounded-md"
              onChange={handleFileChange}
              multiple
              accept=".jpg,.jpeg,.png"
            />
          </div>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
              onClick={closeForm}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePostForm;
