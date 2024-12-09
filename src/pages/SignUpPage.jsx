import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUpPage = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setError(null);

    setIsLoading(true);

    try {
      const signUpResponse = await fetch(
        "http://localhost:8002/api/v2/auth/signup",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: form.username,
            email: form.email,
            password: form.password,
          }),
        }
      );

      const signUpResult = await signUpResponse.json();

      if (signUpResponse.ok) {
        setMessage("Sign-up successful! Sending verification email...");
        localStorage.setItem("email", form.email);

        const emailResponse = await fetch(
          "http://localhost:8002/api/v2/auth/send-verification-email",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: form.email }),
          }
        );

        const emailResult = await emailResponse.json();

        if (emailResponse.ok) {
          setMessage("Verification email sent! Please check your inbox.");
          navigate("/verify");
        } else {
          setMessage(emailResult.error || "Failed to send verification email.");
        }
      } else {
        setMessage(signUpResult.error || "Sign-up failed. Please try again.");
      }
    } catch (error) {
      setMessage("An error occurred. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-gray-100 rounded-xl ">
        {/* Logo */}
        <div className=" flex justify-center p-6">
          <img
            src="/src/assets/images/museo.png"
            alt="MUZEUM Logo"
            className="w-[80%] max-w-xs"
          />
        </div>

        {/* Title */}
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">
          Create Your Account
        </h1>

        {/* Sign-up Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            className="w-full p-4 border-2 border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400 text-lg"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
            required
          />
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
          <input
            type="password"
            placeholder="Confirm Password"
            className="w-full p-4 border-2 border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400 text-lg"
            value={form.confirmPassword}
            onChange={(e) =>
              setForm({ ...form, confirmPassword: e.target.value })
            }
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
                Signing Up...
              </span>
            ) : (
              "Sign Up"
            )}
          </button>
        </form>

        {/* Message Display */}
        {error && <p className="text-center text-red-500 mt-4">{error}</p>}
        {message && (
          <p className="text-center text-green-500 mt-4">{message}</p>
        )}

        {/* Additional Links / Options */}
        <div className="mt-6 text-center">
          <p className="text-gray-600 text-sm">
            Already have an account?{" "}
            <a href="/signin" className="text-blue-600 hover:underline">
              Sign In
            </a>
          </p>
        </div>

        {/* Legal & Policy */}
        <div className="mt-6 text-center text-xs text-gray-500">
          <p>
            By signing up, you agree to our{" "}
            <a
              href="/terms-of-service"
              className="text-blue-600 hover:underline"
            >
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="/privacy-policy" className="text-blue-600 hover:underline">
              Privacy Policy
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
