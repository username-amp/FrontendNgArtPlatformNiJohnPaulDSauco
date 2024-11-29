import React, { useState } from "react";

const ResetPasswordPage = () => {
  const [form, setForm] = useState({ password: "", confirmPassword: "" });
  const [message, setMessage] = useState(null);

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8002/api/v2/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const result = await response.json();
      if (response.ok) {
        setMessage("Password reset successful! You can now sign in.");
      } else {
        setMessage(result.error || "Password reset failed. Try again.");
      }
    } catch (error) {
      setMessage("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="w-full max-w-md p-8 bg-white rounded-xl">
        {/* Logo */}
        <div className="mb-6 flex justify-center">
          <img
            src="/src/assets/images/MUZEUMsignin.png"
            alt="MUZEUM Logo"
            className="w-[50%] max-w-xs"
          />
        </div>

        {/* Title */}
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">
          Reset Your Password
        </h1>

        {/* Reset Password Form */}
        <form onSubmit={handleResetPassword} className="space-y-4">
          <input
            type="password"
            placeholder="New Password"
            className="w-full p-4 border-2 border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400 text-lg"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />
          <input
            type="password"
            placeholder="Confirm Password"
            className="w-full p-4 border-2 border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400 text-lg"
            value={form.confirmPassword}
            onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
            required
          />
          <button
            type="submit"
            className="w-full bg-black text-white p-4 rounded-xl font-bold text-lg hover:bg-gray-800 transition-all duration-300"
          >
            Reset Password
          </button>
        </form>

        {/* Message Display */}
        {message && <p className="text-center text-red-500 mt-4">{message}</p>}
      </div>
    </div>
  );
};

export default ResetPasswordPage;
