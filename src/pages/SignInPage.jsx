import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";

const SignInPage = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:8002/api/v2/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
        credentials: "include",
      });

      const result = await response.json();

      if (response.ok) {
        setMessage("Sign-in successful!");
        const profileResponse = await axiosInstance.get("/auth/profile");
        navigate("/home");
      } else if (response.status === 403) {
        setMessage(
          result.message ||
            "Your account is restricted due to violations. Please contact support."
        );
      } else {
        setMessage(result.error || "Sign-in failed. Try again.");
      }
    } catch (error) {
      setMessage("An error occurred. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="w-full max-w-md p-8 bg-white rounded-xl ">
        <div className=" flex justify-center mb-6">
          <img
            src="/src/assets/images/museo.png"
            alt="MUZEUM Logo"
            className="w-[80%]"
          />
        </div>

        <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">
          Welcome Back to Your Account!
        </h1>

        <form onSubmit={handleSignIn} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full p-4 border-2 border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400 text-lg"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-4 border-2 border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400 text-lg"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />
          <button
            type="submit"
            className="w-full bg-black text-white p-4 rounded-xl font-bold text-lg hover:bg-gray-800 transition-all duration-300"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex justify-center items-center">
                <svg
                  className="animate-spin h-5 w-5 mr-3 border-t-2 border-b-2 border-white rounded-full"
                  viewBox="0 0 24 24"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                </svg>
                Signing In...
              </span>
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        {message && (
          <p className="text-center text-green-500 mt-4">{message}</p>
        )}

        <div className="mt-6 text-center">
          <p className="text-gray-600 text-sm">
            Don't have an account?{" "}
            <a href="/signup" className="text-blue-600 hover:underline">
              Sign Up
            </a>
          </p>
          <p className="text-gray-600 text-sm mt-2">
            Forgot your password?{" "}
            <a
              href="/forgot-password"
              className="text-blue-600 hover:underline"
            >
              Reset Password
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
