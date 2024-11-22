import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const VerifyUserPage = () => {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  const handleVerify = async (e) => {
    e.preventDefault();
    const email = localStorage.getItem("email"); 
  
    if (!email) {
      setMessage("No email found. Please sign up again.");
      return;
    }
  
    try {
      const response = await fetch("http://localhost:8002/api/v2/auth/verify-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code }),
      });
  
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
    }
  };
  

  const handleResendCode = async () => {
    try {
      const response = await fetch("http://localhost:8002/api/v2/auth/send-verification-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const result = await response.json();
      if (response.ok) {
        setMessage("Verification email resent successfully!");
      } else {
        setMessage(result.message || "Failed to resend email. Try again.");
      }
    } catch (error) {
      setMessage("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-md shadow-md">
        <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">Verify Your Account</h1>
        <form onSubmit={handleVerify} className="space-y-4">
          <input
            type="text"
            placeholder="Verification Code"
            className="w-full p-3 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 transition"
          >
            Verify
          </button>
        </form>
        <button
          onClick={handleResendCode}
          className="mt-4 w-full bg-gray-500 text-white p-3 rounded-md hover:bg-gray-600 transition"
        >
          Resend Code
        </button>
        {message && <p className="text-center text-red-500 mt-4">{message}</p>}
      </div>
    </div>
  );
};

export default VerifyUserPage;
