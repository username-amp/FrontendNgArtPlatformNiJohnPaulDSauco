import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom"; // Import useNavigate and Link

const ResetPasswordPage = () => {
  const [form, setForm] = useState({
    email: "",
    code: "",
    password: "",
    confirmPassword: "",
  });
  const [message, setMessage] = useState(null);
  const navigate = useNavigate(); // Initialize the navigate function

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:8002/api/v2/auth/recover-password",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: form.email,
            code: form.code,
            password: form.password,
          }),
        }
      );

      const result = await response.json();
      if (response.ok) {
        setMessage("Password reset successful! You can now sign in.");
        setTimeout(() => {
          navigate("/signin"); // Redirect to the sign-in page after 2 seconds
        }, 2000);
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
        <div className=" flex justify-center p-6">
          <img
            src="/src/assets/images/museo.png"
            alt="MUZEUM Logo"
            className="w-[80%] max-w-xs"
          />
        </div>

        {/* Title */}
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">
          Reset Your Password
        </h1>

        {/* Reset Password Form */}
        <form onSubmit={handleResetPassword} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full p-4 border-2 border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400 text-lg"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Reset Code"
            className="w-full p-4 border-2 border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400 text-lg"
            value={form.code}
            onChange={(e) => setForm({ ...form, code: e.target.value })}
            required
          />
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
            onChange={(e) =>
              setForm({ ...form, confirmPassword: e.target.value })
            }
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
        {message && (
          <div className="text-center mt-4">
            <p className="text-green-500">{message}</p>
            {message.includes("successful") && (
              <Link
                to="/signin"
                className="text-blue-600 hover:underline mt-2 block"
              >
                Go to Sign In
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ResetPasswordPage;
