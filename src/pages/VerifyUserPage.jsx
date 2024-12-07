import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const VerifyUserPage = () => {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleVerify = async (e) => {
    e.preventDefault();
    setLoading(true);
    const email = localStorage.getItem("email");

    if (!email) {
      setMessage("No email found. Please sign up again.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:8002/api/v2/auth/verify-user",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, code }),
        }
      );

      const result = await response.json();
      if (response.ok) {
        setMessage("Verification successful! Redirecting...");
        setTimeout(() => {
          localStorage.removeItem("email");
          navigate("/signin");
        }, 2000);
      } else {
        setMessage(result.message || "Verification failed. Try again.");
      }
    } catch (error) {
      setMessage("An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg ">
        {/* Logo */}
        <div className="mb-6 flex justify-center">
          <img
            src="/src/assets/images/MUZEUMsignin.png"
            alt="MUZEUM Logo"
            className="w-[50%] max-w-xs"
          />
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Verify Your Account
        </h1>

        {/* Verification Form */}
        <form onSubmit={handleVerify} className="space-y-4">
          <input
            type="text"
            placeholder="Verification Code"
            className="w-full p-4 border-2 border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400 text-lg"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-black text-white p-4 rounded-xl font-bold text-lg hover:bg-blue-600 transition-all duration-300"
            disabled={loading}
          >
            {loading ? "Verifying..." : "Verify"}
          </button>
        </form>

        {/* Display Message */}
        {message && (
          <p
            className={`text-center mt-4 ${
              message.includes("success") ? "text-green-500" : "text-red-500"
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default VerifyUserPage;
