import React, { useState } from "react";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(null);

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setMessage(null);

    try {
      const response = await fetch("http://localhost:8002/api/v2/auth/forgot-password-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const result = await response.json();

      if (response.ok) {
        setMessage("Recovery code sent to your email.");
      } else {
        setMessage(result.email || "Failed to send recovery code. Try again.");
      }
    } catch (error) {
      setMessage("An error occurred. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-md shadow-md">
        <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">Forgot Password</h1>
        <form onSubmit={handleForgotPassword} className="space-y-4">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full p-3 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 transition"
          >
            Send Recovery Code
          </button>
        </form>
        {message && <p className="text-center mt-4">{message}</p>}
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
