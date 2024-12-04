import React, { useState } from "react";

const ChangePasswordPage = () => {
  const [form, setForm] = useState({
    oldPassword: "",
    newPassword: "",
  });
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8002/api/v2/auth/change-password", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
        credentials: "include",
      });

      const result = await response.json();

      if (response.ok) {
        alert("Password changed successfully!");
        setForm({ oldPassword: "", newPassword: "" });
      } else {
        setError(result.message || "Failed to change password.");
      }
    } catch (err) {
      console.error("Error:", err);
      setError("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Change Password</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="oldPassword" className="block text-sm font-medium">
            Current Password
          </label>
          <input
            id="oldPassword"
            type="password"
            name="oldPassword"
            value={form.oldPassword}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <div>
          <label htmlFor="newPassword" className="block text-sm font-medium">
            New Password
          </label>
          <input
            id="newPassword"
            type="password"
            name="newPassword"
            value={form.newPassword}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <div>
          <button type="submit" className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            Change Password
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChangePasswordPage;
