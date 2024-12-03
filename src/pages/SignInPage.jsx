import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignInPage = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
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
        navigate("/home");
      } else {
        setMessage(result.error || "Sign-in failed. Try again.");
      }
    } catch (error) {
      setMessage("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="w-full max-w-md p-8 bg-white rounded-xl  ">
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
          Welcome Back to Your Account!
        </h1>

        {/* Sign-in Form */}
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
          >
            Sign In
          </button>
        </form>

        {/* Message Display */}
        {message && <p className="text-center text-red-500 mt-4">{message}</p>}

        {/* Additional Links / Options */}
        <div className="mt-6 text-center">
          <p className="text-gray-600 text-sm">
            Don't have an account?{" "}
            <a href="/signup" className="text-blue-600 hover:underline">
              Sign Up
            </a>
          </p>
          <p className="text-gray-600 text-sm mt-2">
            Forgot your password?{" "}
            <a href="/forgot-password" className="text-blue-600 hover:underline">
              Reset Password
            </a>
          </p>
        </div>

        {/* Social Media Login (optional) */}
        <div className="mt-6 flex justify-center space-x-4">
          <button className="p-3 border-2 border-gray-300 rounded-xl hover:bg-gray-100 transition-all">
            <img src="/path/to/google-logo.png" alt="Google" className="w-6 h-6" />
          </button>
          <button className="p-3 border-2 border-gray-300 rounded-xl hover:bg-gray-100 transition-all">
            <img src="/path/to/facebook-logo.png" alt="Facebook" className="w-6 h-6" />
          </button>
        </div>

        {/* Legal & Policy */}
        <div className="mt-6 text-center text-xs text-gray-500">
          <p>
            By signing in, you agree to our{" "}
            <a href="/terms-of-service" className="text-blue-600 hover:underline">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="/privacy-policy" className="text-blue-600 hover:underline">
              Privacy Policy
            </a>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
